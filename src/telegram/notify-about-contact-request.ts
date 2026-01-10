'use server';

import { sendMessage } from './send-message';

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
  return sendMessage(text.join('\n'));
};
