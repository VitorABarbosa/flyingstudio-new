import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Envio do Banco de Talentos (Junte-se a Nós) com o currículo ANEXADO.
 *
 * Por que existe: anexo de arquivo é recurso PAGO no Web3Forms ("You are
 * trying to use a Pro feature") — no plano gratuito, todo envio com arquivo
 * volta 400. Aqui o próprio site envia o e-mail via SMTP do cPanel, de graça
 * e com o PDF de verdade na mensagem. O formulário de Contato (sem anexo)
 * continua no Web3Forms.
 *
 * Configuração NO SERVIDOR (cPanel → Setup Node.js App → Environment
 * Variables; no Railway, aba Variables):
 *   SMTP_USER  = caixa de e-mail que envia (ex.: site@flyingstudio.com.br)
 *   SMTP_PASS  = senha dessa caixa
 *   SMTP_HOST  = opcional (padrão mail.flyingstudio.com.br)
 *   JUNTE_MAIL_TO = opcional, destinatário (padrão studio@flyingstudio.com.br)
 * Sem SMTP_USER/SMTP_PASS a rota responde erro claro — nada de credencial
 * no código ou no git.
 */

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB — currículo não passa disso
const ALLOWED_EXTENSIONS = /\.(pdf|doc|docx|png|jpe?g|webp)$/i;

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return NextResponse.json({ success: false, message: 'Envio inválido.' }, { status: 400 });
  }

  // Honeypot: bot preencheu o campo invisível — finge sucesso e descarta.
  if (data.get('botcheck')) {
    return NextResponse.json({ success: true });
  }

  const nome = String(data.get('nome') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const area = String(data.get('area') ?? '—').trim();
  const whatsapp = String(data.get('whatsapp') ?? '').trim();
  const file = data.get('attachment');

  if (!nome || !email || !(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { success: false, message: 'Preencha nome, e-mail e anexe o currículo.' },
      { status: 400 }
    );
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { success: false, message: 'O arquivo passa de 10 MB.' },
      { status: 400 }
    );
  }
  if (!ALLOWED_EXTENSIONS.test(file.name)) {
    return NextResponse.json(
      { success: false, message: 'Formato não aceito — envie PDF, DOC ou imagem.' },
      { status: 400 }
    );
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) {
    return NextResponse.json(
      { success: false, message: 'SMTP não configurado no servidor (SMTP_USER/SMTP_PASS).' },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'mail.flyingstudio.com.br',
    port: 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    await transporter.sendMail({
      from: `"Site Flying Studio" <${smtpUser}>`,
      to: process.env.JUNTE_MAIL_TO ?? 'studio@flyingstudio.com.br',
      replyTo: email,
      subject: `Site Flying Studio — Banco de Talentos: ${nome}`,
      text: [
        `Nome: ${nome}`,
        `E-mail: ${email}`,
        `Área desejada: ${area}`,
        `Whatsapp: ${whatsapp || '—'}`,
        '',
        `Currículo anexado: ${file.name}`,
      ].join('\n'),
      attachments: [
        {
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
        },
      ],
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Falha ao enviar o e-mail.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
