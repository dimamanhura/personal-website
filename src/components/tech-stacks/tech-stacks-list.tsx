import { cn, Tooltip, User } from '@nextui-org/react';
import { TechStackWithProjectsAndTools } from '@/db/queries/tech-stacks';
import { TechProjectList } from '@/components';

interface TechStacksListProps {
  techStacks: TechStackWithProjectsAndTools[];
}

export const TechStacksList = ({ techStacks }: TechStacksListProps) => {
  const linkEffectCn = cn(
    'hover:text-under cursor-pointer transition-all duration-200 hover:underline',
  );

  return techStacks.map((techStack) => {
    const { projects, tools, title, logo, id } = techStack;
    return (
      <User
        description={
          <div className="flex gap-1">
            {tools.map((tool, index) => (
              <Tooltip
                content={
                  <TechProjectList
                    projects={[...tool.projects, ...tool.integrationProjects]}
                    techTitle={tool.title}
                  />
                }
                key={tool.id}
              >
                <div className="flex">
                  <span className={linkEffectCn}>{tool.title}</span>
                  {index !== tools.length - 1 && ','}
                </div>
              </Tooltip>
            ))}
          </div>
        }
        avatarProps={{ src: logo || '', radius: 'md' }}
        name={
          projects.length ? (
            <Tooltip content={<TechProjectList projects={projects} techTitle={title} />}>
              <span className={linkEffectCn}>{title}</span>
            </Tooltip>
          ) : (
            title
          )
        }
        key={id}
      />
    );
  });
};
