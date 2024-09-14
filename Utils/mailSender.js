const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from: '"Akatsuki Coding Club" <akatsuki@rcpit.ac.in>',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        return info;
    } catch (error) {
        console.log("Error occured at mailSender: ", error.message)
    }
}

module.exports = mailSender;