'use client';

import { Fragment, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { usePathname, redirect } from 'next/navigation';
import {
  NavbarMenuToggle,
  DropdownTrigger,
  NavbarMenuItem,
  NavbarContent,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  Dropdown,
  Navbar,
  Button,
  Avatar,
  Link,
} from '@nextui-org/react';
import RouterLink from 'next/link';
import { ThemeSwitcher, UserMenu } from '@/components';
import { Page } from '@/types';
import paths from '@/paths';

interface NavProps {
  pages: Page[];
}

const MAX_LINK_TO_SHOW_IN_NAV = 4;

export const Nav = ({ pages }: NavProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linksToShow: Page[] = pages.slice(0, MAX_LINK_TO_SHOW_IN_NAV);
  const linksToShowMore: Page[] = pages.slice(MAX_LINK_TO_SHOW_IN_NAV, pages.length);

  const handleChangePage = (path: string) => {
    setIsMenuOpen(false);
    redirect(path);
  };

  const renderLink = ({ title, path }: { title: string; path: string }) => {
    const isActive = pathname == path;
    return (
      <NavbarItem isActive={isActive}>
        <Link color="foreground" href={path} as={RouterLink} onClick={() => handleChangePage(path)}>
          {title}
        </Link>
      </NavbarItem>
    );
  };

  const renderMenuLink = ({ title, path }: { title: string; path: string }) => {
    const isActive = pathname == path;
    return (
      <NavbarMenuItem isActive={isActive}>
        <Link
          className="w-full"
          color="foreground"
          href={path}
          size="lg"
          as={RouterLink}
          onClick={() => handleChangePage(path)}
        >
          {title}
        </Link>
      </NavbarMenuItem>
    );
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="print:hidden"
    >
      <NavbarBrand className="hidden lg:block">
        <Link href={paths.home()}>
          <Avatar src="/logo.jpg" size="sm" />
        </Link>
      </NavbarBrand>

      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        <NavbarBrand>
          <Link href={paths.home()}>
            <Avatar src="/logo.jpg" size="sm" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-3" justify="start">
        {linksToShow.map((page, index) => (
          <Fragment key={index}>{renderLink(page)}</Fragment>
        ))}
        {linksToShowMore.length > 0 && (
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<FaChevronDown />}
                  radius="sm"
                  variant="light"
                  size="lg"
                >
                  More
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="More links" itemClasses={{ base: 'gap-4' }}>
              {linksToShowMore.map(({ title, path }) => (
                <DropdownItem key={path}>{renderMenuLink({ title, path })}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="flex gap-2">
          <ThemeSwitcher />
          <UserMenu />
        </div>
      </NavbarContent>

      <NavbarMenu>
        {pages.map((page, index) => (
          <Fragment key={index}>{renderMenuLink(page)}</Fragment>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
