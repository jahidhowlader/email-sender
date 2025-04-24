import express from 'express'
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const app = express()
const port = 3000

dotenv.config();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.get('/', (request, response) => {
    response.send('Hello World!')
})

app.post("/send-email", async (req, res) => {

    const { to, subject, message } = req.body;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            info
        });
    }
    catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})