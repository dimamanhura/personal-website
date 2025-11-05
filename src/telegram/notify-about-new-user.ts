'use server';

import { sendMessage } from "./send-message";

export const notifyAboutNewUser = async ({
  email,
  name,
  id,
}: {
  email: string;
  name: string;
  id: string;
}) => {
  const text = [
    '*New user*\n',
    `*Name:* ${name}`,
    `*Email:* ${email}`,
    `*ID:* ${id}\n`,
    `_Please activate the user if needed._`,
  ];
  return sendMessage(text.join('\n'));
};
