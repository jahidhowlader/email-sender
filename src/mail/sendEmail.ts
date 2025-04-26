import { Request } from 'express';
import renderTemplate from '../utils/renderTemplate';
import path from 'path';
import transporter from '../config/transporter';
import { EmailOptions } from '../interface';
import deleteFilesInUploads from '../utils/removeUploadPhoto';

export default async function sendEmail(request: Request) {
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
    }: EmailOptions = request.body;

    const variables = {
        name,
        link
    };
    const html = templateName
        ? await renderTemplate(templateName, variables)
        : undefined;

    // Attachments and inline images
    const attachments: any[] = [];

    if (request.files && 'attachments' in request.files) {
        const files = request.files['attachments'];
        for (const file of files) {
            attachments.push({
                filename: file.originalname,
                path: file.path
            });
        }
    }

    if (request.files && 'inlineImages' in request.files) {
        const files = request.files['inlineImages'];
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
    await deleteFilesInUploads(`${process.cwd()}${path.sep}uploads`)
}