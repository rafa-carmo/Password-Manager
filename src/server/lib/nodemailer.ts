import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'be2ccf9282f2b9',
    pass: '88ee0fdbf86a54'
  }
})
