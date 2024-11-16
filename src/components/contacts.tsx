import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "@nextui-org/react";
import { Contacts as ContactsType, Location } from "@prisma/client";
import Banner from "@/components/banner";

interface ContactsProps {
  location: Location;
  contacts: ContactsType;
};

const Contacts = ({ location, contacts }: ContactsProps) => {
  return (
    <Banner>
      <Link href={`mailto:${contacts.email}`}>
        <FaEnvelope className="mr-1" />
        {contacts.email}
      </Link>
      <Link href={`tel:${contacts.phone}`}>
        <FaPhone className="mr-1" />
        {contacts.phone}
      </Link>
      <Link href={contacts.linkedin}>
        <FaLinkedin className="mr-1" />
        Linkedin
      </Link>
      <Link href={contacts.github}>
        <FaGithub className="mr-1" />
        Github
      </Link>
      <span className="text-black flex items-center">
        <FaLocationDot className="mr-1" />
        {location.city}, {location.country}
      </span>
    </Banner>
  );
};

export default Contacts;
