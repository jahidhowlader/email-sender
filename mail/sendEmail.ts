import transporter from "./transporter";


const sendEmail = (
    to: string,
    subject: string,
    text: string,
    html: string,
    attachments: string
) => {
    const mailOptions = {
        from: process.env.EMAIL_USER as string,
        to,
        subject,
        text,
        html,
        attachments, // For attachments
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
