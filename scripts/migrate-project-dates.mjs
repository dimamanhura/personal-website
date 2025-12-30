import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function migrateProjectDates() {
  try {
    const result = await db.$runCommandRaw({
      update: 'Project',
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
                      $and: [{ $gt: ['$endAt', null] }, { $eq: [{ $type: '$endAt' }, 'string'] }],
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

    console.log('Project dates migrated successfully:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error migrating Project dates:', error);
  } finally {
    await db.$disconnect();
  }
}

migrateProjectDates();
