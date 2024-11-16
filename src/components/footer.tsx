import Link from "next/link";
import { fetchMeta } from "@/db/queries/meta";
import Contacts from "@/components/contacts";
import pages from "@/pages";
import ContactForm from "./contact-form";

const Footer = async () => {
  const meta = await fetchMeta();

  return (
    <footer className="w-full">
      <div className="w-full bg-zinc-100">
        <div className="container py-12 mx-auto grid grid-cols-3 gap-8">
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl">Pages</h2>
            {pages.map((page, index) => (
              <Link href={page.path} key={index} className="underline">
                {page.title}
              </Link>
            ))}
          </section>
          {meta && (
            <section className="flex flex-col gap-2">
              <h2 className="text-2xl">Contacts</h2>
              <Contacts
                contacts={meta?.contacts}
                location={meta?.location}
              />
            </section>
          )}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl">Contact Me</h2>
            <ContactForm />
          </section>
        </div>
      </div>
      <div className="w-full bg-zinc-200">
        <div className="container py-6 mx-auto text-center">
          © 2024 Copyright: {meta?.firstName} {meta?.lastName}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
