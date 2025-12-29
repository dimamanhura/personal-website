import { Prisma } from '@prisma/client';

export function getReadableField(error: Prisma.PrismaClientKnownRequestError): string | string[] {
  const target = error.meta?.target;

  if (Array.isArray(target)) {
    return target;
  }

  if (typeof target === 'string') {
    const parts = target.split('_');

    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1]}`;
    }

    return target;
  }

  return 'Field';
}
