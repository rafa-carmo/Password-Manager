import bcrypt from 'bcrypt'

type DecryptData = {
  password: string
  passwordHash: string
}

function encrypt(password: string) {
  const salt = bcrypt.genSaltSync(10)
  const cryptPassword = bcrypt.hashSync(password, salt)

  return cryptPassword
}
function compare({ password, passwordHash }: DecryptData) {
  const decrypt = bcrypt.compareSync(password, passwordHash)
  return decrypt
}

export { encrypt, compare }
