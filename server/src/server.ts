import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer'

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d085905f6b9d49",
      pass: "5f13ec259986ce"
    }
});

app.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot } = req.body;
    
    const feedback = await prisma.feedback.create({
        data: {
          type: type,
          comment: comment,
          screenshot: screenshot,  
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedget <test@feedget.com>',
        to: 'Valdir Silva <valdir.developervs@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family sans-serif. font-size:16px; color: #222;" >`,
            `<p> Tipo do feedback: ${type} </p>`,
            `<p> Comentário: ${comment} </p>`,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({ data: feedback })
});


app.listen(3333, () => {
    console.log('HTTP server running !!');
});