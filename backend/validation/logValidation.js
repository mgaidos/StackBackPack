const Joi = require('joi')

const validateLogin = (user) => {

    const schema = Joi.object({
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

module.exports = validateLogin