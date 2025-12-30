import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function migrateEducationDates() {
  try {
    const result = await db.$runCommandRaw({
      update: 'Education',
      updates: [
        {
          q: { startAt: { $type: 'string' } },
          u: [
            {
              $set: {
                startAt: {
                  $dateTrunc: {
                    date: { $dateFromString: { dateString: '$startAt' } },
                    unit: 'day',
                  },
                },
                endAt: {
                  $cond: {
                    if: {
                      $and: [{ $ne: ['$endAt', null] }, { $eq: [{ $type: '$endAt' }, 'string'] }],
                    },
                    then: {
                      $dateTrunc: {
                        date: { $dateFromString: { dateString: '$endAt' } },
                        unit: 'day',
                      },
                    },
                    else: '$endAt',
                  },
                },
              },
            },
          ],
          multi: true,
        },
      ],
    });

    console.log('Education migration successful:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await db.$disconnect();
  }
}

migrateEducationDates();
