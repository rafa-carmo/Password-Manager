import Joi from 'joi'

type CreateUserValues = {
  name: string
  username: string
  email: string
  password: string
  repeatPassword: string
}

const errorsMessages = {
  'string.empty': 'Este campo deve ser preenchido.',
  'any.required': 'Este campo deve ser preenchido.',
  'string.email': 'Digite um e-mail valido.',
  'any.only': 'As senhas não são iguais.'
}

const fieldValidations = {
  name: Joi.string()
    .min(2)
    .required()
    .pattern(new RegExp('^[a-zA-Z]'))
    .messages({
      'string.pattern.base': 'O Nome deve ter apenas letras.',
      ...errorsMessages
    }),
  username: Joi.string()
    .min(4)
    .required()
    .messages({
      'string.min': 'Este campo deve ter ao menos 4 caracteres.',
      ...errorsMessages
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(errorsMessages),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .messages({
      'string.min': 'Este campo deve ter ao menos 8 caracteres.',
      ...errorsMessages
    }),
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages(errorsMessages)
}

type FieldErrors = {
  [key: string]: string
}

function getFieldErrors(objErrors: Joi.ValidationResult<any>) {
  const errors: FieldErrors = {}
  if (objErrors.error) {
    console.log(objErrors)
    objErrors.error.details.forEach((err) => {
      errors[err.path.join('.')] = err.message
    })
  }

  return errors
}

export function createUserValidation(values: CreateUserValues) {
  const schema = Joi.object(fieldValidations)
  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}
