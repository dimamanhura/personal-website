import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function migrateAchievements() {
  try {
    await db.$runCommandRaw({
      update: 'Project',
      updates: [
        {
          q: { 'achievements.points': { $exists: true } },
          u: [
            {
              $set: {
                achievements: {
                  $map: {
                    input: '$achievements',
                    as: 'acc',
                    in: {
                      title: '$$acc.title',
                      description: {
                        $reduce: {
                          input: '$$acc.points',
                          initialValue: '',
                          in: {
                            $concat: [
                              '$$value',
                              { $cond: [{ $eq: ['$$value', ''] }, '', '\n'] },
                              '• ',
                              '$$this',
                            ],
                          },
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

    console.log('Migration completed: points converted to description strings.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await db.$disconnect();
  }
}

migrateAchievements();
