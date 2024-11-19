'use client';

import { usePathname, redirect } from "next/navigation";
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
import ThemeSwitcher from "./theme-switcher";

const Nav = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChangePage = (path: string) => {
    setIsMenuOpen(false);
    redirect(path);
  };

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
          color="foreground"
          href={path}
          as={RouterLink}
          onClick={() => handleChangePage(path)}
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
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="print:hidden">
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
    
      <NavbarContent className="hidden md:flex gap-3" justify="start">
        {pages.map((page, index) => (
          <Fragment key={index}>
            {renderLink(page)}
          </Fragment>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitcher />
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

export default Nav;
