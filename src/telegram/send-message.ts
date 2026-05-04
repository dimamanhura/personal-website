'use server';

import axios from 'axios';
import { env } from '@/lib';

const botToken = env.TELEGRAM_BOT_TOKEN;
const chatId = env.TELEGRAM_CHAT_ID;

export const sendMessage = async (text: string) => {
  const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    parse_mode: 'Markdown',
    chat_id: chatId,
    text,
  });

  return response;
};
