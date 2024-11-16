'use client';

import { usePathname } from "next/navigation";
import {
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  Navbar,
  Link,
} from "@nextui-org/react";
import RouterLink from "next/link";
import { Fragment, useState } from "react";
import pages from "@/pages";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderLink = ({
    title,
    path,
  }: {
    title: string;
    path: string;
  }) => {
    const isActive = pathname == path;
    return (
      <NavbarItem isActive={isActive}>
        <Link
          color={isActive ? 'secondary' : 'foreground'}
          href={path}
          as={RouterLink}
        >
          {title}
        </Link>
      </NavbarItem>
    );
  };

  const renderMenuLink = ({
    title,
    path,
  }: {
    title: string;
    path: string;
  }) => {
    const isActive = pathname == path;
    return (
      <NavbarMenuItem isActive={isActive}>
        <Link
          className="w-full"
          color={isActive ? 'secondary' : 'foreground'}
          href={path}
          size="lg"
        >
          {title}
        </Link>
      </NavbarMenuItem>
    );
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
    
      <NavbarContent className="hidden sm:flex gap-3" justify="start">
        {pages.map((page, index) => (
          <Fragment key={index}>
            {renderLink(page)}
          </Fragment>
        ))}
      </NavbarContent>
      
      <NavbarMenu>
        {pages.map((page, index) => (
          <Fragment key={index}>
            {renderMenuLink(page)}
          </Fragment>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
