import ContactRequestStatus from "@/components/contact-request-status";
import { ContactRequest } from "@prisma/client";

interface ContactRequestCardProps {
  contactRequest: ContactRequest;
};

const ContactRequestCard = ({ contactRequest }: ContactRequestCardProps) => {
  return (
    <div className="w-full flex flex-col gap-2 py-4 px-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
      <div className="flex justify-between align-middle">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-medium">
            {contactRequest.name}, {contactRequest.email} 
          </h4>
          <p className="text-sm text-foreground-400">
            {contactRequest.createdAt.toLocaleString()}
          </p>
        </div>
        
        <ContactRequestStatus resolved={contactRequest.resolved} />
      </div>

      <p className="text-sm mt-2">
        {contactRequest.message}
      </p>

      {contactRequest.resolved && contactRequest.resolution && (
        <>
          <h4 className="font-medium mt-2">Resolution:</h4>
          <p className="text-sm">
            {contactRequest.resolution}
          </p>
        </>
      )}
    </div>
  );
};

export default ContactRequestCard;
