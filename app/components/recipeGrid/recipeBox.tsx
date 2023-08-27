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
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-medium text-gray-900">
          {recipe.title}
        </h3>

        {recipe.photoUrl !== '' && (<div className="w-48 my-4 relative">
          <img className="object-contain rounded-md" src={recipe.photoUrl} alt="" />
        </div>)}
        {recipe.categories && (<ul className="flex flex-col space-y-2">
          {recipe.categories.map((category: string, index: number) => (
            <li
              key={index}
              className="relative flex-initial mr-2 mt-2 p-1 shadow-sm rounded-lg bg-indigo-100 text-md font-medium text-indigo-800 text-center"
            >
              {category}
            </li>
          ))}
        </ul>)}
      </div>
    </Link>
  );
}
