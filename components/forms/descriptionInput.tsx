type descriptionInputProps = {
  description: string;
  setDescription: (description: string) => void;
};

export default function DescriptionInput(props: descriptionInputProps) {
  const { description, setDescription } = props;

  return (
    <div className="sm:col-span-4">
      <label
        htmlFor="recipe-description"
        className="block text-sm font-medium text-gray-700"
      >
        Description
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="recipe-description"
          id="recipe-description"
          autoComplete="given-name"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
