// import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
// import Image from "next/image";

import { Link } from "@remix-run/react";

interface RecipeBoxProps {
  recipe: any;
}

export default function RecipeBox(props: RecipeBoxProps) {
  const { recipe } = props;

  return (
    <Link to={`/recipes/${recipe._id}`}>
      <div className="flex flex-1 flex-col p-8">
        {/* <div className="h-48 w-48 relative">
          <Image className="rounded-md" fill={true} src={recipe.photo} alt="" />
        </div> */}

        <h3 className="mt-6 text-lg font-medium text-gray-900">
          {recipe.title}
        </h3>
        {/* <ul className="mt-2 flex flex-col space-y-2">
          {recipe.categories.map((category: string, index: number) => (
            <li
              key={index}
              className="relative flex-initial mr-2 mt-2 p-1 shadow-sm rounded-lg bg-indigo-100 text-md font-medium text-indigo-800 text-center"
            >
              {category}
            </li>
          ))}
        </ul> */}
      </div>
    </Link>
  );
}
