import Joi from 'joi';

export default Joi.object({
    phone: Joi.string()
        .regex(/^9989[012345789][0-9]{7}$/)
        .error(Error("Invalid phone number!"))
})