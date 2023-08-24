import type { V2_MetaFunction } from "@remix-run/node";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Crystal's Cookbook" }];

export default function Index() {
  const user = useOptionalUser();
  console.log(user);
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">Crystal's Cookbook</div>
    </main>
  );
}
