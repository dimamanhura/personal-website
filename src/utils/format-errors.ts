import { getReadableField } from '@/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatErrors(error: any) {
  if (error.name === 'ZodError') {
    const fieldErrors = JSON.parse(error.message).map(
      ({ message }: { message: string }) => message,
    );
    return fieldErrors.join('. ');
  }

  if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
    return `${getReadableField(error)} already exist`;
  }

  return typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
}
