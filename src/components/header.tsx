'use client';

import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownTrigger,
  NavbarContent,
  DropdownItem,
  DropdownMenu,
  NavbarItem,
  Dropdown,
  Avatar,
  Button,
  Navbar,
  Input,
  Link,
  User,
} from "@nextui-org/react";
import RouterLink from "next/link";
import { FaGithub, FaSearch } from "react-icons/fa";
import { signIn } from "@/actions";

const Header = () => {
  const session = useSession();
  const pathname = usePathname();

  const renderLink = ({
    title,
    href,
  }: {
    title: string;
    href: string;
  }) => {
    const isActive = pathname == href;
    return (
      <NavbarItem isActive={isActive}>
        <Link
          color={isActive ? 'secondary' : 'foreground'}
          href={href}
          as={RouterLink}
        >
          {title}
        </Link>
      </NavbarItem>
    );
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarContent className="hidden sm:flex gap-3">
          {renderLink({ title: 'Home', href: '/' })}
          {renderLink({ title: 'Significant Projects', href: '/significant-projects' })}
          {renderLink({ title: 'Achievements', href: '/achievements' })}
          {renderLink({ title: 'Feedback', href: '/feedback' })}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<FaSearch size={18} />}
          type="search"
        />
        {session?.data?.user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                className="transition-transform"
                color="secondary"
                name={session.data.user.name || ''}
                size="sm"
                src={session.data.user.image || ''}
                as="button"
              />
            </DropdownTrigger>
            
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                isReadOnly
                key="profile"
                className="h-14 gap-2 opacity-100"
              >
                <User
                  description={session.data.user.email}
                  name={session.data.user.name}
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: session.data.user.image || '',
                  }}
                />
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ): (
          <NavbarItem>
            <Button
              variant="flat"
              startContent={<FaGithub size={18} />}
              onClick={() => signIn()}
            >
              Sign in with Github
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  )
};

export default Header;
