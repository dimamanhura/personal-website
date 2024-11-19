import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Contacts as ContactsType, Location } from "@prisma/client";
import { Link } from "@nextui-org/react";

interface ContactsProps {
  location: Location;
  contacts: ContactsType;
};

const Contacts = ({ location, contacts }: ContactsProps) => {
  const linkCN = 'flex items-center text-black dark:text-white text-sm';
  return (
    <>
      <Link href={`mailto:${contacts.email}`} className={linkCN}>
        <FaEnvelope className="mr-2" />
        {contacts.email}
      </Link>
      <Link href={`tel:${contacts.phone}`} className={linkCN}>
        <FaPhone className="mr-2" />
        {contacts.phone}
      </Link>
      <Link href={contacts.linkedin} className={linkCN}>
        <FaLinkedin className="mr-2" />
        Linkedin
      </Link>
      <Link href={contacts.github} className={linkCN}>
        <FaGithub className="mr-2" />
        Github
      </Link>
      <span className={linkCN}>
        <FaLocationDot className="mr-2" />
        {location.city}, {location.country}
      </span>
    </>
  );
};

export default Contacts;
