import Joi from "joi";

export default Joi.object({
    name: Joi.string()
        .max(64)
        .min(3)
        .required()
        .error(Error("Name is invalid!")),
    phone: Joi.string()
        .regex(/^9989[012345789][0-9]{7}$/)
        .error(Error("Invalid phone number!")),
    birth_date: Joi.date()
        .error(Error("Date is invalid"))
        .required(),
    gender: Joi.number()
        .min(1)
        .max(2)
        .error(Error("Gender is invalid"))
        .required()
})