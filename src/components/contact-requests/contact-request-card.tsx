import { ContactRequest } from '@prisma/client';
import { ContactRequestStatus } from '@/components';

interface ContactRequestCardProps {
  contactRequest: ContactRequest;
}

export const ContactRequestCard = ({ contactRequest }: ContactRequestCardProps) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <div className="flex justify-between align-middle">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-medium">
            {contactRequest.name}, {contactRequest.email}
          </h4>
          <p className="text-sm text-foreground-400">{contactRequest.createdAt.toLocaleString()}</p>
        </div>

        <ContactRequestStatus resolved={contactRequest.resolved} />
      </div>

      <p className="mt-2 text-sm">{contactRequest.message}</p>

      {contactRequest.resolved && contactRequest.resolution && (
        <>
          <h4 className="mt-2 font-medium">Resolution:</h4>
          <p className="text-sm">{contactRequest.resolution}</p>
        </>
      )}
    </div>
  );
};
