import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function updateCompaniesLocations() {
  try {
    await db.$runCommandRaw({
      update: 'Company',
      updates: [
        {
          q: { location: { $type: 'string' } },
          u: [
            {
              $set: {
                location: {
                  city: '$location',
                  country: 'Ukraine',
                },
              },
            },
          ],
          multi: true,
        },
      ],
    });

    console.log('All companies have been updated.');
  } catch (error) {
    console.error('Error updating companies:', error);
  } finally {
    await db.$disconnect();
  }
}

updateCompaniesLocations();
