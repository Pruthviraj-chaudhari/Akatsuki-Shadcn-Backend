import { createTransport } from "nodemailer";

const mailSender = async (email, title, body) => {
    try {
        let transporter = createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from: 'Akatsuki Connect',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        
        return info;
    } catch (error) {
        console.log("Error occured at mailSender: ", error.message)
    }
}

export default mailSender;