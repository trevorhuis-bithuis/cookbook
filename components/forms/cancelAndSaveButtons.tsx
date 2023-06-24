type cancelAndSaveButtonProps = {
  handleCancel: () => void;
  handleSaveRecipe: () => void;
  isSaveDisabled: boolean;
};

export default function CancelAndSaveButton(props: cancelAndSaveButtonProps) {
  const { handleCancel, handleSaveRecipe, isSaveDisabled } = props;

  return (
    <div className="pt-5">
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveRecipe}
          disabled={isSaveDisabled}
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 disabled:bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}
