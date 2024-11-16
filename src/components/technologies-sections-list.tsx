import { User } from "@nextui-org/react";
import { TechnologySectionWithTechnologies } from "@/db/queries/technologies";

interface TechnologiesSectionsListProps {
  technologiesSections: TechnologySectionWithTechnologies[];
};

const TechnologiesSectionsList = ({ technologiesSections }: TechnologiesSectionsListProps) => {
  return technologiesSections.map(technologiesSection => {
    const { technologies, title, logo, id } = technologiesSection;
    return (
      <User
        description={`${technologies.map(technology => technology.title).join(', ')}`}
        avatarProps={{ src: logo, radius: 'md' }}
        name={title}
        key={id}
      />
    );
  });
};

export default TechnologiesSectionsList;