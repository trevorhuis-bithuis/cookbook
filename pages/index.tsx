import type { NextPage } from 'next'
import Image from 'next/image'

const Home: NextPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-2xl text-center m-6">{`Crystal's Cooking`}</p>
            <Image
                src="/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.jpg"
                alt="me"
                width="640"
                height="640"
            />
        </div>
    )
}

export default Home
