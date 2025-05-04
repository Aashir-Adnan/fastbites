require('dotenv').config();
const nodemailer = require('nodemailer');
async function handleSendEmail(userEmail, html, subject) {

    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: 'Fast Bites',
            to: `${userEmail}`,
            subject: subject,
            html: html,
        };

        await transporter.sendMail(mailOptions);
        console.log(mailOptions);

        return "Email Sent Successfully"

    } catch (error) {
        console.error('Error occurred while sending email or logging:', error);
    } 
}


module.exports = {handleSendEmail};
