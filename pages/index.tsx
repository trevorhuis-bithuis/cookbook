import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

function Card({ title, description, image, url }: any) {
  return (
    <div className="col-span-1 rounded-2xl bg-gray-800 px-8 py-10 text-center">
      <h3 className="mt-6 text-2xl font-semibold leading-7 tracking-tight text-white">
        {title}
      </h3>
      <p className="text-md leading-6 text-gray-400">{description}</p>
      <div className="mt-8 flex justify-center rounded-md">
        <Image
          src={image}
          alt=""
          className="rounded-lg"
          width={300}
          height={300}
        />
      </div>
      <div className="m-4 flex justify-center">
        <Link
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          href={url}
        >
          {title}
        </Link>
      </div>
    </div>
  );
}

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <p className="text-2xl text-center m-6">{`Crystal's Cooking`}</p>
      <p className="text-md text-center m-6">
        Bacon ipsum dolor amet fatback swine cupim capicola tail. Kevin ball tip
        cupim meatloaf strip steak. Chislic pork chicken meatloaf beef
        tenderloin shankle tongue cow rump biltong filet mignon. Beef ribs
        pancetta tenderloin, spare ribs ribeye sausage filet mignon turkey
        chislic tail brisket salami. Shankle biltong cow, sirloin porchetta
        pastrami buffalo tail swine bacon.
      </p>
      <div className="grid grid-cols-2 space-x-12">
        <Card
          title={"Recipes"}
          description={"Your favorite recipes"}
          image={"/recipe.png"}
          url={"/recipes"}
        />
        <Card
          title={"Menus"}
          description={"Curated menus for a special occasion"}
          image={"/menu.jpg"}
          url={"/menus"}
        />
      </div>
    </div>
  );
};

export default Home;
