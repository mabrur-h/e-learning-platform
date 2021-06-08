import Joi from "joi";

export default Joi.object({
    name: Joi.string()
        .max(64)
        .min(3)
        .required()
        .error(Error("Name is invalid!")),
    email: Joi.string()
        .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .error(Error("Invalid email address!")),
    birth_date: Joi.date()
        .error(Error("Date is invalid"))
        .required(),
    gender: Joi.number()
        .min(1)
        .max(2)
        .error(Error("Gender is invalid"))
        .required()
})