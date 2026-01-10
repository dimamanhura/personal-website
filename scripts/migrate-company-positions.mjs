import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function migrateCompanyPositions() {
  try {
    const result = await db.$runCommandRaw({
      update: 'Company',
      updates: [
        {
          q: { 'positions.startAt': { $type: 'string' } },
          u: [
            {
              $set: {
                positions: {
                  $map: {
                    input: '$positions',
                    as: 'pos',
                    in: {
                      title: '$$pos.title',
                      startAt: {
                        $dateTrunc: {
                          date: { $dateFromString: { dateString: '$$pos.startAt' } },
                          unit: 'day',
                        },
                      },
                      endAt: {
                        $cond: {
                          if: {
                            $and: [
                              { $ne: ['$$pos.endAt', null] },
                              { $eq: [{ $type: '$$pos.endAt' }, 'string'] },
                            ],
                          },
                          then: {
                            $dateTrunc: {
                              date: { $dateFromString: { dateString: '$$pos.endAt' } },
                              unit: 'day',
                            },
                          },
                          else: '$$pos.endAt',
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
          multi: true,
        },
      ],
    });

    console.log('Company positions migration successful:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await db.$disconnect();
  }
}

migrateCompanyPositions();
