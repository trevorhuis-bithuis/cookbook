import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const ConfirmRequest: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  if (!loading && !session) {
    router.push('/auth/signin');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 max-w-md mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : !session ? (
        <p>Redirecting...</p>
      ) : (
        <>
          <h1 className="text-2xl sm:text-4xl font-bold mt-4">
            You&apos;re logged in!
          </h1>
          <p className="text-lg sm:text-2xl mt-4">
            Go back to your original tab.
          </p>
          <p className="text-normal sm:text-lg text-gray-500 mt-6">
            You can close this window or click{' '}
            <Link href="/">
              <a className="text-blue-500 hover:underline hover:text-blue-600">
                this link
              </a>
            </Link>{' '}
            to go back to the homepage.
          </p>
        </>
      )}
    </div>
  );
};

export default ConfirmRequest;
