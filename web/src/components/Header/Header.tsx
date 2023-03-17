import { Disclosure } from '@headlessui/react'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { LoaderIcon } from '@redwoodjs/web/dist/toast'

// @TODO: update links urls to constants
// import { PACK_COLLECTION_BASE, PUZZLE_LANDING_BASE } from '@lib/constants'
import Button from 'src/components/Button/Button'
import ProfileIcon from 'src/components/ProfileIcon/ProfileIcon'
import WalletButton from 'src/components/WalletButton/WalletButton'
import Logo from 'src/svgs/Logo'
import LogoMobile from 'src/svgs/LogoMobile'

const Header = () => {
  const { loading } = useAuth()

  return (
    <Disclosure as="header" className="header fixed top-0 z-50 w-full bg-blue">
      {({ open }) => (
        <>
          <div
            className="border-b border-indigo-500 px-4 sm:px-6 lg:border-none lg:px-8"
            aria-label="Top"
          >
            <div className="relative flex h-20 items-center justify-between">
              <div data-cy="ik logo" className="logo">
                <div className="block sm:hidden">
                  <Link
                    to={routes.home()}
                    className="block"
                    aria-label="return home"
                  >
                    <LogoMobile />
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <Link
                    to={routes.home()}
                    className="bg-purple-500 text-left"
                    aria-label="return home"
                  >
                    <Logo />
                  </Link>
                </div>
              </div>

              <div className="menu-items hidden items-center justify-center sm:items-stretch sm:justify-start lg:flex">
                <nav className="flex space-x-4">
                  <Link
                    to={routes.home()}
                    className="header-nav--link text-2xl font-medium text-white hover:text-turquoise"
                  >
                    Home
                  </Link>
                  <a
                    href="https://blog.infinitykeys.io/what-is-infinity-keys"
                    target="_blank"
                    rel="noopener"
                    className="header-nav--link text-2xl font-medium text-white hover:text-turquoise"
                  >
                    Thesis
                  </a>
                  <a
                    href="https://docs.infinitykeys.io"
                    target="_blank"
                    rel="noopener"
                    className="header-nav--link text-2xl font-medium text-white hover:text-turquoise"
                  >
                    Docs
                  </a>
                  <a
                    href="https://blog.infinitykeys.io"
                    target="_blank"
                    rel="noopener"
                    className="header-nav--link text-2xl font-medium text-white hover:text-turquoise"
                  >
                    Blog
                  </a>
                  <Link
                    to="/#build"
                    className="header-nav--link text-2xl font-medium text-white hover:text-turquoise"
                  >
                    Build
                  </Link>
                </nav>
              </div>

              <div data-cy="puzzle-link" className="flex items-center gap-2">
                <Button
                  text="Play"
                  to={routes.play()}
                  variant="outline"
                  responsive
                />

                <WalletButton />
                {loading ? <LoaderIcon /> : <ProfileIcon />}
              </div>

              {/* hamburger icon, visible mobile only */}
              <div className="hamburger flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* mobile menu */}
          <Disclosure.Panel className="absolute top-20 left-0 w-full bg-blue lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link
                to={routes.home()}
                className="block rounded-md px-3 py-2 text-2xl font-medium text-white"
              >
                Home
              </Link>
              <a
                href="https://blog.infinitykeys.io/what-is-infinity-keys"
                target="_blank"
                rel="noopener"
                className="block rounded-md px-3 py-2 text-2xl font-medium text-white"
              >
                Thesis
              </a>
              <a
                href="https://docs.infinitykeys.io"
                target="_blank"
                rel="noopener"
                className="block rounded-md px-3 py-2 text-2xl font-medium text-white"
              >
                Docs
              </a>
              <a
                href="https://blog.infinitykeys.io"
                target="_blank"
                rel="noopener"
                className="block rounded-md px-3 py-2 text-2xl font-medium text-white"
              >
                Blog
              </a>
              <Link
                to="/#build"
                className="block rounded-md px-3 py-2 text-2xl font-medium text-white"
              >
                Build
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
