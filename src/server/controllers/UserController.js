import phoneValidation from "../validations/phoneValidation.js";
import signUpValidation from "../validations/signUpValidation.js";
import rn from 'random-number';

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
            const gen = rn.generator({
                min: 100000,
                max: 999999,
                integer: true
            })
            const genNumber = gen();

            let attempt = await req.postgres.attempts.create({
                code: genNumber,
                user_id: user.user_id
            })

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
}

export default UserController;