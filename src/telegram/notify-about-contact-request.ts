'use server';

import axios from 'axios';

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export const notifyAboutContactRequest = async ({
  message,
  email,
  name,
}: {
  message: string;
  email: string;
  name: string;
}) => {
  const text = [
    '*New contact request*\n',
    `*Name:* ${name}`,
    `*Email:* ${email}\n`,
    `_${message}_`,
  ];

  const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    parse_mode: 'Markdown',
    chat_id: chatId,
    text: text.join('\n'),
  });

  return response;
};
