import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '27ab94f52ef428',
    pass: '0db4129367a81e'
  }
})
