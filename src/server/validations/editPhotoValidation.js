import Joi from "joi";

export default Joi.object({
    file_id: Joi.string()
        .required()
        .error(Error("File is invalid!"))
})