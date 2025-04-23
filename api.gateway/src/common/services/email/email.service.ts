import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendUserTemporaryPasswordEmail(
    plainPassword: string,
    userEmail: string,
    userName?: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: `"Payment Gateway" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Senha temporária',
      html: `
      <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sua Senha Temporária</title>
        <style type="text/css">
          /* Client-specific styles */
          body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
          
          /* Reset styles */
          body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
          
          /* iOS BLUE LINKS */
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
        </style>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f7f7; color: #333333;">
        <!-- Email container -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7f7f7;">
          <tr>
            <td align="center" valign="top">
              <!-- Main content -->
              <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <!-- Header -->
                <tr>
                  <td align="center" style="padding: 40px 20px 20px 20px; background-color: #7c86ff; border-radius: 8px 8px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Payment Gateway</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 30px 40px;">
                    <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">Olá ${userName || 'usuário'},</h2>
                    <p style="font-size: 16px; line-height: 1.5; color: #4b5563;">Você recebeu uma senha temporária para acessar sua conta no Payment Gateway:</p>
                    
                    <!-- Password box -->
                    <table border="0" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; border-radius: 6px; margin: 20px 0; padding: 12px 24px; width: 100%;">
                      <tr>
                        <td align="center">
                          <p style="font-size: 24px; font-weight: bold; letter-spacing: 1px; color: #111827; margin: 0;">${plainPassword}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 16px; line-height: 1.5; color: #4b5563;">Por questões de segurança, recomendamos que você:</p>
                    <ul style="font-size: 16px; line-height: 1.5; color: #4b5563; padding-left: 20px;">
                      <li>Altere esta senha após o primeiro login</li>
                      <li>Não compartilhe sua senha com ninguém</li>
                    </ul>
                    
                    <!-- Button -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <a href="#" style="background-color: #7c86ff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">Acessar Minha Conta</a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 16px; line-height: 1.5; color: #4b5563; margin-bottom: 0;">Atenciosamente,</p>
                    <p style="font-size: 16px; line-height: 1.5; color: #4b5563; margin-top: 0; font-weight: bold;">Equipe Payment Gateway</p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center; font-size: 14px; color: #6b7280;">
                    <p style="margin: 0;">© ${new Date().getFullYear()} Payment Gateway. Todos os direitos reservados.</p>
                    <p style="margin: 10px 0 0 0;">Caso não tenha solicitado este e-mail, por favor ignore.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
        `,
    });
  }
}
