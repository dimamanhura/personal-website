import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { z } from 'zod';
import { env } from './config';

const sqsClient = new SQSClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const sqsPayloadSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.email().min(10).max(255),
  message: z.string().min(1),
});

type SQSPayload = z.infer<typeof sqsPayloadSchema>;

export const sendCommand = async (body: SQSPayload) => {
  const validData = sqsPayloadSchema.parse(body);

  const command = new SendMessageCommand({
    QueueUrl: env.AWS_SQS_QUEUE_URL,
    MessageBody: JSON.stringify(validData),
  });

  return await sqsClient.send(command);
};
