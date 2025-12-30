import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function migrateAndCleanupFeedback() {
  try {
    const result = await db.$runCommandRaw({
      update: 'Feedback',
      updates: [
        {
          q: { createdAt: { $exists: true } },
          u: [
            {
              $set: {
                receivedAt: {
                  $dateTrunc: {
                    date: { $dateFromString: { dateString: '$createdAt' } },
                    unit: 'day',
                  },
                },
              },
            },
            {
              $unset: 'createdAt',
            },
          ],
          multi: true,
        },
      ],
    });

    console.log('Migration and Cleanup successful:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await db.$disconnect();
  }
}

migrateAndCleanupFeedback();
