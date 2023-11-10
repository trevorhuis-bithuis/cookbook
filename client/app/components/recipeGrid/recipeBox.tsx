import { Link } from "@remix-run/react";

interface RecipeBoxProps {
  recipe: any;
}

export default function RecipeBox(props: RecipeBoxProps) {
  const { recipe } = props;

  return (
    <Link to={`/recipes/${recipe._id}`}>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-medium text-gray-900 border-b-2 pb-2">
          {recipe.title}
        </h3>

        {recipe.categories && (
          <ul className="grid grid-cols-2 space-y-2">
            {recipe.categories
              .slice(0, 2)
              .map((category: string, index: number) => (
                <li
                  key={index}
                  className="relative flex-initial mr-2 mt-2 p-1 shadow-sm rounded-lg bg-indigo-100 text-sm font-medium text-indigo-800 text-center"
                >
                  {category}
                </li>
              ))}
          </ul>
        )}
        {recipe.photoUrl !== "" && (
          <div className="w-48 my-4 relative">
            <img
              className="object-contain rounded-md"
              src={recipe.photoUrl}
              alt=""
            />
          </div>
        )}
      </div>
    </Link>
  );
}
