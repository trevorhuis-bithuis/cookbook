import { type NextPage } from "next";
import SearchBar from "@/components/searchBar";
import MenuGrid from "@/components/menuGrid";
import Paginator from "@/components/paginator";
import { useEffect, useState } from "react";

const Menus: NextPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [menus, setMenus] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [noneFound, setNoneFound] = useState<boolean | null>(null);

  function searchMenus() {
    setLoading(true);

    async function getMenus() {
      const fetchedMenus = await fetch(
        `api/menus/search?search=${searchText}&category=${selectedCategory}&page=${
          page - 1
        }`
      );
      const menus = await fetchedMenus.json();
      setMenus(menus);
    }

    getMenus();

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-xl mt-6">Menus</p>
      <SearchBar
        setSearchText={setSearchText}
        setSelectedCategory={setSelectedCategory}
        search={searchMenus}
        page={page}
      />

      {menus.length === 0 && noneFound && (
        <p className="text-xl mt-6">No menus found</p>
      )}
      {menus.length > 0 && (
        <>
          <div className="py-4 mt-6">
            <MenuGrid menus={menus} />
          </div>

          <Paginator
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            menuLength={menus.length}
          />
        </>
      )}
    </div>
  );
};

export default Menus;
