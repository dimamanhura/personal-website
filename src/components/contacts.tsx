import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Contacts as ContactsType, Location } from "@prisma/client";
import { Link } from "@nextui-org/react";

interface ContactsProps {
  location: Location;
  contacts: ContactsType;
};

const Contacts = ({ location, contacts }: ContactsProps) => {
  return (
    <>
      <Link href={`mailto:${contacts.email}`} className="flex items-center text-black text-sm">
        <FaEnvelope className="mr-2" />
        {contacts.email}
      </Link>
      <Link href={`tel:${contacts.phone}`} className="flex items-center text-black text-sm">
        <FaPhone className="mr-2" />
        {contacts.phone}
      </Link>
      <Link href={contacts.linkedin} className="flex items-center text-black text-sm">
        <FaLinkedin className="mr-2" />
        Linkedin
      </Link>
      <Link href={contacts.github} className="flex items-center text-black text-sm">
        <FaGithub className="mr-2" />
        Github
      </Link>
      <span className="text-black flex items-center text-sm">
        <FaLocationDot className="mr-2" />
        {location.city}, {location.country}
      </span>
    </>
  );
};

export default Contacts;
