'use client';

import { useSession } from 'next-auth/react';
import { pages, adminPages } from '@/pages';
import * as actions from '@/actions';

import {
  DropdownTrigger,
  DropdownSection,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Avatar,
} from "@nextui-org/react"
import { Page } from '@/types';

export const UserMenu = () => {
  const { data, status } = useSession();

  const renderLinks = (pagesLinks: Page[]) => {
    return pagesLinks.map(page => (
      <DropdownItem key={page.path} href={page.path}>
        {page.title}
      </DropdownItem>
    ));
  };

  if (!data?.user?.email || status !== 'authenticated') {
    return null;
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          name={data.user.name || ''}
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection>
          <DropdownItem key="user" description={data.user.email}>
            {data.user.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Overview">
          {renderLinks(pages)}
        </DropdownSection>
        <DropdownSection showDivider title="Admin space">
          {renderLinks(adminPages)}
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            onPress={() => actions.signOutUser()}
          >
            Sign Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
 