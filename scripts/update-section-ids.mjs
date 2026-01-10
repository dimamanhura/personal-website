import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function updateSectionIds() {
  try {
    const sections = await db.technologySection.findMany({
      select: {
        id: true,
        type: true,
      },
    });

    const technologies = await db.technology.findMany();

    await Promise.all(
      technologies.map((technology) => {
        const section = sections.find(({ type }) => type === technology.section);
        return db.technology.update({
          where: { id: technology.id },
          data: {
            sectionId: section?.id || null,
          },
        });
      }),
    );

    console.log('All sectionIds have been updated.');
  } catch (error) {
    console.error('Error updating sectionIds:', error);
  } finally {
    await db.$disconnect();
  }
}

updateSectionIds();
