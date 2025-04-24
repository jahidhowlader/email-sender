import { Request } from 'express';
import renderTemplate from '../utils/renderTemplate';
import transporter from '../config/transporter';
import { EmailOptions } from '../interface';

export default async function sendEmail(req: Request) {
    const {
        to,
        cc,
        bcc,
        subject,
        text,
        replyTo,
        priority,
        templateName,
        name,
        link,
        headers = {},
    } : EmailOptions = req.body;

    const variables = {
        name,
        link
    };
    const html = templateName
        ? await renderTemplate(templateName, variables)
        : undefined;

    // Attachments and inline images
    const attachments: any[] = [];

    if (req.files && 'attachments' in req.files) {
        const files = req.files['attachments'];
        for (const file of files) {
            attachments.push({ filename: file.originalname, path: file.path });
        }
    }

    if (req.files && 'inlineImages' in req.files) {
        const files = req.files['inlineImages'];
        for (const file of files) {
            attachments.push({
                filename: file.originalname,
                path: file.path,
                cid: file.originalname // Use this CID in the HTML: <img src="cid:filename.png">
            });
        }
    }

    const mailOptions = {
        from: process.env.MAIL_FROM,
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        replyTo,
        priority,
        attachments,
        headers,
    };

    await transporter.sendMail(mailOptions);
}