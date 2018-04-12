const nodemailer = require('nodemailer');

class EmailHandler {
    static sendEmail(from, to, subject, output) {
        return new Promise((resolve, reject) => {
            // port: 465 secure: true
            // port: 587 secure: false
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: 465,
                secure: true, 
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
        
            const mailOptions = {
                from:`${from} <${process.env.EMAIL_ADDRESS}>`,
                to: to,
                subject: subject,
                html: output
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(['There was problem while sending this message']);
                } else {
                    resolve('Message sent successfully');
                }
            });
        });
    }
}

module.exports = EmailHandler;
