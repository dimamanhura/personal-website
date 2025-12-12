'use client';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return <span className="p-1 text-tiny text-danger">{message}</span>;
};
