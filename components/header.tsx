import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from "next-auth/react"


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const router = useRouter()
    const { data: session } = useSession()

    const navigation = [
        { name: 'Search', href: '/search', current: router.pathname.includes('/search') ? true : false },
        { name: 'New Recipe', href: '/new-recipe', current: router.pathname.includes('/new-recipe') ? true : false },
        { name: 'Blog', href: '/blog', current: router.pathname.includes('/blog') ? true : false }
    ]

    return (
        <Disclosure as="nav" className="bg-gray-800" >
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" >
                        <div className="relative flex h-16 items-center justify-between" >
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden" >
                                {/* Mobile menu button*/}
                                < Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" >
                                    <span className="sr-only" > Open main menu </span>
                                    {
                                        open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )
                                    }
                                </Disclosure.Button>
                            </div>
                            < div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start" >
                                <div className="flex flex-shrink-0 items-center" >
                                    <Link href="/" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                                        </svg>
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block" >
                                    <div className="flex space-x-4" >
                                        {
                                            navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={
                                                        classNames(
                                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'px-3 py-2 rounded-md text-sm font-medium'
                                                        )
                                                    }
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0" >

                                {session && session.user && (
                                    <Menu as="div" className="relative ml-3" >
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" >
                                                <span className="sr-only" > Open user menu </span>
                                                <Image
                                                    className="h-8 w-8 rounded-full"
                                                    width={32}
                                                    height={32}
                                                    src={session.user.image!}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {
                                                        ({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Settings
                                                            </a>
                                                        )
                                                    }
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {
                                                        ({ active }) => (
                                                            <Link
                                                                href="/api/auth/signout"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Sign out
                                                            </Link>
                                                        )
                                                    }
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                )}
                                {!session && (
                                    <Link href="/api/auth/signin" className="text-sm font-medium text-gray-300 hover:text-white" > Sign in </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    < Disclosure.Panel className="sm:hidden" >
                        <div className="space-y-1 px-2 pt-2 pb-3" >
                            {
                                navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={
                                            classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block px-3 py-2 rounded-md text-base font-medium'
                                            )
                                        } href={item.href}>{item.name}</Link>
                                ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
