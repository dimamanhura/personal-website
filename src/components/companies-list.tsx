import { formatDateRange } from "@/utils/format-date-range";
import { User } from "@nextui-org/react";
import { Company } from "@prisma/client";

interface CompaniesListProps {
  companies: Company[];
};

const CompaniesList = ({ companies }: CompaniesListProps) => {
  return companies.map(company => {
    const { position, logo, name, startAt, endAt, id } = company;
    return (
      <User
        description={`${position}, ${formatDateRange(startAt, endAt)}`}
        avatarProps={{ src: logo }}
        name={name}
        key={id}
      />
    );
  });
};

export default CompaniesList;
