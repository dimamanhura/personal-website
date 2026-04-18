import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const sendCommand = async (body: object) => {
  const command = new SendMessageCommand({
    QueueUrl: process.env.AWS_SQS_QUEUE_URL,
    MessageBody: JSON.stringify(body),
  });

  return await sqsClient.send(command);
};
