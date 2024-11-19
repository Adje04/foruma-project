import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { sendOtpCode } from '../utils/emailTemplates.js';

dotenv.config()

const transporter = nodemailer.createTransport(
    {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


export const sendOtpEmail = async (email, otpCode) => {

    const mailOptions = {
        from: '"foruma" <accounts@unetah.net>',
        to: email,
        subject: 'Votre code OTP',
        text: `Votre code OTP est ${otpCode}`,
        html: sendOtpCode.replace('{otpCode}', otpCode)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};








