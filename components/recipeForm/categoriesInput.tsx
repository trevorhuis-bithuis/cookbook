import { useState } from "react";

type categoriesInputProps = {
  categories: string[];
  setCategories: (categories: string[]) => void;
};

export default function CategoriesInput(props: categoriesInputProps) {
  const { categories, setCategories } = props;

  const [categoryInput, setCategoryInput] = useState("");

  const addCategory = (category: string) => {
    if (category === "") {
      return;
    }
    setCategories([...categories, category]);
    setCategoryInput("");
  };

  return (
    <div className="sm:col-span-6 max-w-7xl">
      <label
        htmlFor="location"
        className="block text-sm font-medium text-gray-700"
      >
        Categories
      </label>
      <input
        type="text"
        name="category"
        className="w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        onChange={(e) => {
          setCategoryInput(e.target.value);
        }}
        value={categoryInput}
      />
      <button
        type="button"
        className="inline-flex items-center mx-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          addCategory(categoryInput);
        }}
      >
        Add
      </button>

      <div>
        <ul role="list" className="flex flex-wrap m-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className="relative flex-initial mr-4 mt-4 p-3 shadow-sm rounded-lg bg-indigo-100 text-md font-medium text-indigo-800 text-center"
            >
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="absolute w-6 h-6 -right-2 -top-2 bg-indigo-100 rounded-full"
                  onClick={() => {
                    setCategories(
                      categories.filter((c) => {
                        return c !== category;
                      })
                    );
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
