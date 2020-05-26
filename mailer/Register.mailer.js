const nodemailer = require("nodemailer");

const registerMail = async (to, uuid) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_NODEMAILER,
        port: process.env.PORT_NODEMAILER,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_NODEMAILER, // generated ethereal user
            pass: process.env.PASSWORD_NODEMAILER // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Kaggle Clase 👻" <' + process.env.EMAIL_NODEMAILER + '>', // sender address
        to: to, // list of receivers
        subject: "Hello 👋", // Subject line
        html: '<a href="http://localhost:5000/api/users/activate/' + uuid + '">Activa la cuenta</a>',
        text: "URL: http://localhost:5000/api/users/activate/'" + uuid
    });

    //console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = { registerMail: registerMail }