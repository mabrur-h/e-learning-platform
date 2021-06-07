import phoneValidation from "../validations/phoneValidation.js";
import signUpValidation from "../validations/signUpValidation.js";

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
}

export default UserController;