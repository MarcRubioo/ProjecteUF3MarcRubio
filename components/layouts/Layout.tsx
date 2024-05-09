import Head from "next/head";
import { FC, ReactNode } from "react";
import { NavBar } from "../ui";

interface Props {
  title?: string;
}

export const Layout: React.FC<{ children: ReactNode } & Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Marc Rubio" />
        <meta name="description" content={`Información sobre el pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>

      <NavBar />

      <main className="p-5">{children}</main>
    </>
  );
};

