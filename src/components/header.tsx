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
import paths from "@/paths";

const menuItems = [
  { title: 'Home', href: paths.home() },
  { title: 'Technologies', href: paths.technologies() },
  { title: 'Projects', href: paths.projects() },
  { title: 'Achievements', href: paths.achievements() },
  { title: 'Feedback', href: paths.feedback() },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const renderMenuLink = ({
    title,
    href,
  }: {
    title: string;
    href: string;
  }) => {
    const isActive = pathname == href;
    return (
      <NavbarMenuItem isActive={isActive}>
        <Link
          className="w-full"
          color={isActive ? 'secondary' : 'foreground'}
          href={href}
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
        {menuItems.map((menuItem, index) => (
          <Fragment key={index}>
            {renderLink(menuItem)}
          </Fragment>
        ))}
      </NavbarContent>
      
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <Fragment key={index}>
            {renderMenuLink(item)}
          </Fragment>
        ))}
      </NavbarMenu>
    </Navbar>
  )
};

export default Header;
