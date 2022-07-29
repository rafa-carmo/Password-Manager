import Joi from 'joi'

import { getFieldErrors } from '.'

type CreateUserValues = {
  name: string
  username: string
  email: string
  password: string
  repeatPassword: string
}

type signinUserValues = {
  login: string
  password: string
  captcha: string
}

const errorsMessages = {
  'string.empty': 'Este campo deve ser preenchido.',
  'any.required': 'Este campo deve ser preenchido.',
  'string.email': 'Digite um e-mail valido.',
  'any.only': 'As senhas não são iguais.',
  'string.min': 'Está muito curto'
}

const fieldSignUpValidations = {
  name: Joi.string()
    .min(2)
    .required()
    .pattern(new RegExp('^[a-zA-Z]'))
    .messages({
      ...errorsMessages,
      'string.pattern.base': 'O Nome deve ter apenas letras.'
    }),
  username: Joi.string()
    .min(4)
    .required()
    .messages({
      ...errorsMessages,
      'string.min': 'Este campo deve ter ao menos 4 caracteres.'
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
      ...errorsMessages,
      'string.min': 'Este campo deve ter ao menos 8 caracteres.'
    }),
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages(errorsMessages)
}

const fieldSignInValidations = {
  login: Joi.string().min(3).required().messages(errorsMessages),
  password: Joi.string().min(3).required().messages(errorsMessages),
  captcha: Joi.string().required().messages({
    'string.empty': 'Resolva o captcha antes de continuar.',
    'any.required': 'Resolva o captcha antes de continuar.'
  })
}

export function createUserValidation(values: CreateUserValues) {
  const schema = Joi.object(fieldSignUpValidations)
  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

export function loginUserValidation(values: signinUserValues) {
  const schema = Joi.object(fieldSignInValidations)
  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}
