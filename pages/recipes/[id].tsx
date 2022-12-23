import type { InferGetServerSidePropsType, NextPage, NextPageContext } from 'next'

export async function getServerSideProps(context: NextPageContext) {
    const url = `http://localhost:3000/api/recipe/${context.query.id}`
    // Fetch data from external API
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    // Pass data to the page via props
    return { props: { data } }
}

const RecipeSingle = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <>
            <h1>Single Recipe {data.recipe.title}</h1>
        </>
    )
}

export default RecipeSingle