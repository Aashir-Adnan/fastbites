require('dotenv').config({ path: '../.env' });
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
        console.log(process.env.EMAIL_PASS);
        console.log(process.env.EMAIL_USER)
        let mailOptions = {
            from: 'Fast Bites',
            to: `${userEmail}`,
            subject: subject,
            html: html,
        };

        await transporter.sendMail(mailOptions);

        return "Email Sent Successfully"

    } catch (error) {
        console.error('Error occurred while sending email or logging:', error);
    } 
}


module.exports = {handleSendEmail};
