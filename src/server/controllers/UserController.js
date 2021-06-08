import phoneValidation from "../validations/phoneValidation.js";
import signUpValidation from "../validations/signUpValidation.js";
import codeValidation from "../validations/codeValidation.js";
import rn from 'random-number';
import sendSms from '../modules/sms.js'
import JWT from '../modules/jwt.js'
import pkg from 'sequelize';
import moment from "moment";

const { Op } = pkg;

class UserController {
    static async checkPhone(req, res) {
        try {
            const data = await phoneValidation.validateAsync(req.body);
            let user = await req.postgres.users.findOne({
                where: {
                    phone: data.phone
                }
            })

            res.status(200).json({
                ok: true,
                isExist: user ? true : false
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ''
            })
        }
    }
    static async signUp(req, res) {
        try {
            const data = await signUpValidation.validateAsync(req.body);
            const user = await req.postgres.users.create({
                name: data.name,
                birth_date: data.birth_date,
                phone: data.phone,
                gender: data.gender == 1 ? "female" : "male"
            })

            res.status(201).json({
                ok: true,
                message: "Successfully registered!",
                data: user.dataValues
            })
        } catch (e) {
            if (e == "SequelizeUniqueConstraintError: Validation error") {
                e = "Phone already exists!"
            }
            res.status(400).json({
                ok: false,
                message: e + ''
            })
        }
    }
    static async login(req, res) {
        try {
            const data = await phoneValidation.validateAsync(req.body);
            const user = await req.postgres.users.findOne({
                where: {
                    phone: data.phone
                }
            })

            if (!user) throw new Error("User not found!");

            const ban = await req.postgres.bans.findOne({
                where: {
                    user_id: user.dataValues.user_id,
                    expireDate: {
                        [Op.gt]: new Date()
                    }
                }
            })

            if (ban) throw new Error(`You have been banned until ${moment(ban.dataValues.expireDate)}`)

            const gen = rn.generator({
                min: 100000,
                max: 999999,
                integer: true
            })
            const genNumber = gen();

            await req.postgres.attempts.destroy({
                where: {
                    user_id: user.user_id
                }
            })

            let attempt = await req.postgres.attempts.create({
                code: genNumber,
                user_id: user.user_id
            })

            console.log(attempt.dataValues.code)
            // await sendSms(data.phone, `Your verification code: ${attempt.dataValues.code}`)

            await res.status(201).json({
                ok: true,
                message: "Code sent on your device!",
                id: attempt.dataValues.id
            })

        } catch (e) {
            res.status(401).json({
                ok: false,
                message: e + ''
            })
        }
    }
    static async validateCode(req, res) {
        try {
            const validationId = req.headers['code-validation-id'];
            if (!validationId) throw new Error("Invalid validation token!");
            const attempt = await req.postgres.attempts.findOne({
                where: {
                    id: validationId
                },
                include: {
                    model: req.postgres.users,
                    attributes: ["user_attempts"]
                }
            })


            if (!attempt) throw new Error("Validation code is not found!")
            console.log(attempt.dataValues.attempts, attempt.dataValues.user.dataValues.user_attempts)

            const { code } = await codeValidation.validateAsync(req.body)
            if (Number(code) !== Number(attempt.dataValues.code)) {
                await req.postgres.attempts.update({
                    attempts: attempt.dataValues.attempts + 1
                }, {
                    where: {
                        id: validationId
                    }
                })
                if (Number(attempt.dataValues.attempts) > 2) {
                    await req.postgres.attempts.destroy({
                        where: {
                            id: validationId
                        }
                    })


                    await req.postgres.users.update({
                        user_attempts: attempt.dataValues.user.dataValues.user_attempts + 1
                    }, {
                        where: {
                            user_id: attempt.dataValues.user_id
                        }
                    })
                    if (Number(attempt.dataValues.user.dataValues.user_attempts) >= 2) {
                        await req.postgres.users.update({
                            user_attempts: 0
                        }, {
                            where: {
                                user_id: attempt.dataValues.user_id
                            }
                        })

                        await req.postgres.bans.create({
                            user_id: attempt.dataValues.user_id,
                            expireDate: new Date(Date.now() + 7200000)
                        })
                    }
                }
                throw new Error("Your validation code is incorrect!")
            }

            await req.postgres.sessions.destroy({
                where: {
                    user_id: attempt.dataValues.user_id
                }
            })

            let userAgent = req.headers["user-agent"];
            let ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

            if (!(userAgent && ipAddress)) throw new Error("Invalid device!")

            const session = await req.postgres.sessions.create({
                user_id: attempt.dataValues.user_id,
                ip_address: ipAddress,
                user_agent: userAgent
            })

            const token = JWT.generateToken({
                id: session.dataValues.id
            })

            await req.postgres.attempts.destroy({
                where: {
                    user_id: attempt.dataValues.user_id
                }
            })

            await req.postgres.attempts.update({
                user_attempts: 0
            }, {
                where: {
                    user_id: attempt.dataValues.user_id
                }
            })

            res.status(201).json({
                ok: true,
                message: "Logged in!",
                data: {
                    token
                }
            })

        } catch (e) {
            res.status(401).json({
                ok: false,
                message: e + ''
            })
        }
    } 
}

export default UserController;