import { getReadableField } from '@/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatErrors(error: any) {
  if (error.name === 'ZodError') {
    const fieldErrors = error.issues.map(
      ({ path, message }: { path: (string | number)[]; message: string }) => {
        if (path.length > 0) {
          const field = String(path[0]);
          const formattedField = field.charAt(0).toUpperCase() + field.slice(1);
          return `${formattedField}: ${message}`;
        }
        return message;
      },
    );
    return fieldErrors.join('. ');
  }

  if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
    return `${getReadableField(error)} already exist`;
  }

  return typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
}
