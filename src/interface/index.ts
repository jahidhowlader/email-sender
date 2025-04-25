interface InlineImage {
    filename: string;
    path: string;
    cid: string; // unique ID for embedding in HTML content
}

export interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    cc?: string;
    bcc?: string;
    attachments?: any[];
    headers?: Record<string, string>;
    replyTo?: string;
    priority?: 'high' | 'normal' | 'low';
    templateName?: string;
    name: string;
    link: string;
    inlineImages?: InlineImage[]
}
