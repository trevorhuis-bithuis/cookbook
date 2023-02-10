import { useState } from 'react'

type categoriesInputProps = {
    categories: string[]
    setCategories: (categories: string[]) => void
}

export default function CategoriesInput(props: categoriesInputProps) {
    const { categories, setCategories } = props

    const [category, setCategory] = useState('')

    const addCategory = (category: string) => {
        if (category === '') {
            return
        }
        setCategories([...categories, category])
    }

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
                    setCategory(e.target.value)
                }}
                value={category}
            />
            <button
                type="button"
                className="inline-flex items-center mx-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                    addCategory(category)
                }}
            >
                Add
            </button>

            <div>
                <ul role="list" className="flex flex-wrap m-2">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className="flex-initial mr-4 mt-4 p-2 shadow-sm rounded-lg bg-indigo-100 text-md font-medium text-indigo-800 text-center"
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
