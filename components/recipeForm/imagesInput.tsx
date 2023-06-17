import { v4 as uuidv4 } from "uuid";

type ImagesInputProps = {
  setImageUrl: (image: string) => void;
};

export default function ImagesInput(props: ImagesInputProps) {
  const { setImageUrl } = props;

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) return;
    const file = e.target.files[0];
    const filename = encodeURIComponent(
      `${uuidv4()}.${file.name.split(".")[1]}`
    );
    const res = await fetch(`/api/upload-image?file=${filename}`);
    const data = await res.json();
    const formData = new FormData();

    Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value);
    });

    fetch(data.url, {
      method: "POST",
      body: formData,
    });

    setImageUrl(
      `https://cookbook-recipe-images.s3.amazonaws.com/${data.fields.key}`
    );
  };

  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="cover-image"
        className="block text-sm font-medium text-gray-700"
      >
        Images
      </label>
      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".jpg, .jpeg, .png"
                onInput={uploadPhoto}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
}
