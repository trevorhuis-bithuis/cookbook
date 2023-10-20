type searchBarProps = {
  setSearchText: (searchText: string) => void;
  page: number;
};

export default function SearchBar(props: searchBarProps) {
  const { setSearchText } = props;

  return (
    <div className="flex flex-col items-center md:flex-row">
      <div className="mx-2 mt-4 basis-3/4">
        <label htmlFor="search" className="text-sm font-medium text-gray-700">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border border-gray-300 p-2 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10 basis-1/4">
        <button
          type="submit"
          className="mx-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </div>
  );
}
