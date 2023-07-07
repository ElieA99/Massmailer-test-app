//Defining used packages
const dotenv = require('dotenv');
const fs = require('fs');
const nodemailer = require('nodemailer');

dotenv.config();

//Create a transport object using smtp
let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    }
});

//Read emails from txt file
fs.readFile('recipients.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Failed to read recipients file:', err);
        return;
    }

    // Extract individual email addresses from the data
    const recipients = data.split(',');

    //Loop the data and send emails
    recipients.forEach((recipients) => {
        // Remove any leading/trailing white spaces
        recipients = recipients.trim();

        //Setup email data
        let mailOptions = {
            from: process.env.USER,
            to: recipients,
            subject: 'NODEJS MASSMAILER',
            text: 'THIS IS A TEST MESSAGE',
        };

        //Send mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) { console.log(`Failed to send email to ${recipients}:${error}`); }
            else { console.log(`Email sent to ${recipients}:${info.response}`); }
        });
    });
});