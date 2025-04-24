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
}