import Link from 'next/link';
import { fetchMeta } from '@/db/queries/meta';
import { CreateContactRequestForm, Contacts } from '@/components';
import { pages } from '@/pages';

export const Footer = async () => {
  const meta = await fetchMeta();

  return (
    <footer className="w-full print:hidden">
      <div className="w-full bg-zinc-100 dark:bg-zinc-800">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-8 py-12 md:grid-cols-2 md:px-16 lg:grid-cols-3">
          <section className="col-span-1 flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl">Pages</h2>
            {pages.map((page, index) => (
              <Link href={page.path} key={index} className="underline">
                {page.title}
              </Link>
            ))}
          </section>
          {meta && (
            <section className="col-span-1 flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl">Contacts</h2>
              <Contacts contacts={meta?.contacts} location={meta?.location} />
            </section>
          )}
          <section className="col-span-1 flex flex-col gap-2 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl md:text-2xl">Contact Me</h2>
            <CreateContactRequestForm />
          </section>
        </div>
      </div>
      <div className="w-full bg-zinc-200 dark:bg-zinc-700">
        <div className="container mx-auto py-6 text-center">
          © 2024 Copyright: {meta?.firstName} {meta?.lastName}
        </div>
      </div>
    </footer>
  );
};
