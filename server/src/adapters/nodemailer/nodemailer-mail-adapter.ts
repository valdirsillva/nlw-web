import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d085905f6b9d49",
      pass: "5f13ec259986ce"
    }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body}: SendMailData ) {
     
    await transport.sendMail({
        from: 'Equipe Feedget <test@feedget.com>',
        to: 'Valdir Silva <valdir.developervs@gmail.com>',
        subject,
        html: body
    })
  }
}