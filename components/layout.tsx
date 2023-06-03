import Header from "./header";
import Footer from "./footer";
import { ReactNode, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const isOwner = true;

  return (
    <>
      <Header isOwner={isOwner} />
      <main> {children} </main>
      <Footer />
    </>
  );
}
