import Joi from 'joi'

import { getFieldErrors } from '.'

type CreateMasterKeyValues = {
  password: string
  repeatePassword: string
}

const errorsMessages = {
  'string.empty': 'Este campo deve ser preenchido.',
  'any.required': 'Este campo deve ser preenchido.',
  'any.only': 'As senhas não são iguais.',
  'string.min': 'A senha deve ter ao menos 8 caracteres.'
}
const fieldCreateMasterKeyValidations = {
  password: Joi.string().required().min(8).messages(errorsMessages),
  repeatePassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages(errorsMessages)
}

export function createMasterKeyValidation(values: CreateMasterKeyValues) {
  const schema = Joi.object(fieldCreateMasterKeyValidations)
  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}
