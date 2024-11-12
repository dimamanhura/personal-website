import { User } from "@nextui-org/react";
import { Education } from "@prisma/client";
import moment from "moment";

interface UniversityCardProps {
  university: Education;
};

const UniversityCard = ({ university }: UniversityCardProps) => {
  const { title, logo, name, startAt, endAt } = university;

  const formatDate = (date: string) => {
    return moment(date).format('MMM YYYY');
  };

  const formatDescription = () => {
    const startAtDate = formatDate(startAt);
    const endAtDate = endAt ? formatDate(endAt) : 'Present';
    return `${title}, ${startAtDate} - ${endAtDate}`;
  };

  return (
    <User
      description={formatDescription()}
      avatarProps={{ src: logo, isBordered: true, radius: 'md' }}
      name={name}
    />
  );
};

export default UniversityCard;
