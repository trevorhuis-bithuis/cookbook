import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import recipeImage from "../images/recipe.png";
import menuImage from "../images/menu.jpg";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Crystal's Cookbook" }];

function Card({ title, description, image, url }: any) {
  return (
    <div className="col-span-1 rounded-2xl bg-gray-800 px-8 py-10 text-center">
      <h3 className="mt-6 text-2xl font-semibold leading-7 tracking-tight text-white">
        {title}
      </h3>
      <p className="text-md leading-6 text-gray-400">{description}</p>
      <div className="mt-8 flex justify-center rounded-md">
        <img
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
          to={url}
        >
          {title}
        </Link>
      </div>
    </div>
  );
}

export default function Index() {
  const user = useOptionalUser();
  console.log(user);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <p className="m-6 text-center text-2xl">{`Crystal's Cooking`}</p>
      <p className="text-md m-6 text-center">
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
          image={recipeImage}
          url={"/recipes/search"}
        />
        <Card
          title={"Menus"}
          description={"Curated menus for a special occasion"}
          image={menuImage}
          url={"/menus"}
        />
      </div>
    </div>
  );
}
