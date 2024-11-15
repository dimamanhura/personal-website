import { User } from "@nextui-org/react";
import { Company } from "@prisma/client";
import moment from "moment";

interface CompanyCardProps {
  company: Company;
};

const CompanyCard = ({ company }: CompanyCardProps) => {
  const { position, logo, name, startAt, endAt } = company;

  const formatDate = (date: string) => {
    return moment(date).format('MMM YYYY');
  };

  const formatDescription = () => {
    const startAtDate = formatDate(startAt);
    const endAtDate = endAt ? formatDate(endAt) : 'Present';
    return `${position}, ${startAtDate} - ${endAtDate}`;
  };

  return (
    <User
      description={formatDescription()}
      avatarProps={{ src: logo }}
      name={name}
    />
  );
};

export default CompanyCard;
