# 📧 Send Email Service

This is a simple Node.js + TypeScript service that sends emails using Express and Nodemailer. It supports HTML templates, attachments, inline images, and automatic cleanup of uploaded files.

## Features

- Sends emails with text or HTML content.
- Supports CC, BCC, and reply-to fields.
- Supports email priority and custom headers.
- Dynamically renders HTML templates using variables.
- Supports file attachments and inline images.
- Cleans up uploaded files after sending.

## Prerequisites

- Node.js

## 🛠 Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/jahidhowlader/email-sender.git
    cd email-sender

2. Create a .env file in the root directory and configure the following variables:
    ```bash
    MAIL_FROM=your-email@example.com
    MAIL_HOST=smtp.example.com
    MAIL_PORT=587
    MAIL_USER=your-smtp-user
    MAIL_PASS=your-smtp-password

3. Install the dependencies:
    ```bash
    npm install

4. Run the application:
    ```bash
    npm start

---
