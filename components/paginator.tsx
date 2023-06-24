import { useEffect, useState } from "react";

type paginatorProps = {
  recipeLength: number;
  page: number;
  setPage: (page: number) => void;
  searchRecipes: () => void;
};

export default function Paginator(props: paginatorProps) {
  const { recipeLength, page, setPage, searchRecipes } = props;

  return (
    <nav
      className="flex items-center border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{page * 8 - 7}</span> to{" "}
          <span className="font-medium">
            {page * 8 > recipeLength ? recipeLength : page * 8}
          </span>{" "}
          of <span className="font-medium">{recipeLength}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
              searchRecipes();
            }
          }}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (page < Math.floor(recipeLength / 8)) {
              setPage(page + 1);
              searchRecipes();
            }
          }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
