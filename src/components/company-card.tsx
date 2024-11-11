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

  const formatName = () => {
    const startAtDate = formatDate(startAt);
    const endAtDate = endAt ? formatDate(endAt) : 'Present';
    return `${name} (${startAtDate} - ${endAtDate})`;
  };

  return (
    <User
      description={position}
      avatarProps={{ src: logo }}
      name={formatName()}
    />
  );
};

export default CompanyCard;
