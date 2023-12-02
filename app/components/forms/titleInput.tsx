type titleInputProps = {
  title: string;
  setTitle: (title: string) => void;
};

export default function TitleInput(props: titleInputProps) {
  const { title, setTitle } = props;

  return (
    <div className="sm:col-span-4">
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Title
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="given-name"
          className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>
  );
}
