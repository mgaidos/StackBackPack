const Joi = require('joi')

const validateRegistration = (user) => {

    const schema = Joi.object({
        username: Joi.string()
            .pattern(new RegExp('^[A-Za-z0-9]{3,16}$'))
            .required(),

        email: Joi.string()
            .pattern(new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"))
            .email({ minDomainSegments: 2 })
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^.{6,}$'))
            .required()

    })
    return schema.validate(user)
}

module.exports = validateRegistration