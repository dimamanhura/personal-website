import { User } from '@nextui-org/react';
import { Meta } from '@prisma/client';
import { Contacts } from '@/components';

interface UProfileCardProps {
  profile: Meta;
}

export const ProfileCard = ({ profile }: UProfileCardProps) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
      <div>
        <User
          description={profile.title}
          avatarProps={{
            src: profile.avatar,
            size: 'md',
            radius: 'md',
          }}
          name={`${profile.firstName} ${profile.lastName}`}
        />
      </div>

      <p className="w-full text-justify text-sm text-zinc-500 dark:text-zinc-300">
        {profile.description}
      </p>

      <Contacts contacts={profile.contacts} location={profile.location} />
    </div>
  );
};
