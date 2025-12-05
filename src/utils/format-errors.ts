// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatErrors(error: any) {
  if (error.name === 'ZodError') {
    const fieldErrors = JSON.parse(error.message).map(
      ({ message }: { message: string }) => message,
    );
    return fieldErrors.join('. ');
  }

  if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
    const field = error.meta?.target ? error.meta.target[0] : 'Field';
    return `${field.charAt(0).toUpperCase()}${field.slice(1)} already exist`;
  }

  return typeof error.message === 'string' ? error.message : JSON.stringify(error.message);
}
