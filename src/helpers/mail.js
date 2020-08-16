const nodemailer = require("nodemailer");
module.exports = () => {
    let instance;

    function init(mailUsername, mailPassword) {
        let transporter = nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            // service: 'Yandex',
            auth: {
                user: mailUsername,
                pass: mailPassword
            }
        });
        return {
            send: async function (dataSend, mailTo, from = "", title) {
                let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                    from: from ? from : title + "<" + mailUsername + ">",
                    to: mailTo,
                    subject: dataSend.Title,
                    html: dataSend.Content,
                    bcc: [mailUsername].concat(global.config.list_mail_bcc)
                };
                return await transporter.sendMail(mainOptions);
            }
        }
    }

    return {
        getInstance: function (mailUsername, mailPassword) {

            if (!instance) {
                instance = init(mailUsername, mailPassword);
            }
            return instance;
        }
    }
};
