import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailerService {
    public mail;
    constructor(private config: ConfigService) {
        this.mail = require('nodemailer').createTransport({
            service: 'gmail',
            auth: {
                user: config.get('GMAIL_USERNAME'),
                pass: config.get('GMAIL_PASSWORD')
            }
        })
    }
    async send(data) {
        await this.mail.sendMail({
            from: `"OnlineShopDB" <${ this.config.get("GMAIL_USERNAME") }>`,
            to: data.email,
            subject: 'OnlineShopDB: Подтверждение регистрации',
            html: data.html
        })
    }

}
