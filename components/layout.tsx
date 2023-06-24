import Header from "./header";
import Footer from "./footer";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  // @ts-ignore
  const isOwner = session?.user?.owner;

  return (
    <>
      <Header isOwner={isOwner} />
      <main> {children} </main>
      <Footer />
    </>
  );
}
