import express, { NextFunction, Request, Response, response } from 'express';
import dotenv from 'dotenv';
import sendEmail from './src/mail/sendEmail';
import { upload } from './src/config/multerConfig';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.post(
    '/send-email',
    upload.fields([
        { name: 'attachments', maxCount: 10 },
        { name: 'inlineImages', maxCount: 10 },
    ]),
    async (request, response) => {
        try {
            await sendEmail(request);
            response.status(200)
                .json({
                    message: 'Email sent successfully'
                });
        }
        catch (err) {
            response.status(500)
                .json({
                    message: 'Nodemailer Email',
                    error: (err as Error).message
                });
        }
    }
);

// GLOBAL ERROR
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {

    response.status(500)
        .json({
            message: 'Internal Server Error',
            error: (error as Error).message
        });
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/**
 * @SIMPLE_DEFAULT_SEND_EMAIL
 */
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// app.post("/send-email", async (req, res) => {
//     const { to, subject, message } = req.body;
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to,
//         subject,
//         text: message,
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         res.status(200).json({
//             success: true,
//             info
//         });
//     }
//     catch (error: any) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });