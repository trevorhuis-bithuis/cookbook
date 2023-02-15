import type { NextPage } from 'next'
import RecipeGrid from '../components/recipeGrid'
import { useEffect, useState } from 'react'

const Search: NextPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch(`/api/recipes/search`)
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.recipes)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!recipes) return <p>No recipe data</p>

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xl mt-6">Recipes</p>
            {/* <label htmlFor="search" className="block text-sm font-medium text-gray-700 mt-2">
                Search
            </label>
            <div className="relative w-1/2 flex items-center">
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                        Enter
                    </kbd>
                </div>
            </div> */}

            <div className="py-4">
                <RecipeGrid recipes={recipes} />
            </div>

            {/* <nav
                className="flex items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                        <span className="font-medium">20</span> results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
            </nav> */}
        </div>
    )
}

export default Search
