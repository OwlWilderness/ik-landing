import { Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import clsx from 'clsx'

import { Link, routes, useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import WalletButton from 'src/components/WalletButton/WalletButton'
import LogoFullSm from 'src/images/full-logo-sm.webp'
import LogoHeader1x from 'src/images/IK-LOGO-1x.webp'
import LogoHeader2x from 'src/images/IK-LOGO-2x.webp'
import { useGlobalInfo } from 'src/providers/globalInfo/globalInfo'
import DiscordIcon from 'src/svgs/DiscordIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

const CLERK_SIGNIN_PORTAL_URL = process.env.CLERK_SIGNIN_PORTAL_URL

if (!CLERK_SIGNIN_PORTAL_URL) {
  throw new Error('Missing CLERK_SIGNIN_PORTAL_URL variable')
}

const socialLinks = [
  {
    href: 'https://twitter.com/InfinityKeys',
    testing: 'twitter',
    ariaLabel: 'visit IK Twitter.',
    icon: <TwitterIcon />,
  },
  {
    href: 'https://discord.com/invite/infinitykeys',
    testing: 'discord',
    ariaLabel: 'visit IK Discord.',
    icon: <DiscordIcon />,
  },
]

const DesktopNav = () => {
  const { isAuthenticated } = useAuth()

  return (
    <nav className="hidden max-w-lg items-center justify-end gap-4 lg:flex xl:max-w-xl">
      <Link to={routes.play()}>Play</Link>
      {isAuthenticated ? (
        <Link to={routes.profile()}>Profile</Link>
      ) : (
        <a href={`${CLERK_SIGNIN_PORTAL_URL}`}>Log In</a>
      )}
    </nav>
  )
}

const Logos = () => {
  const { pathname } = useLocation()
  const { pageHeading } = useGlobalInfo()

  const withPageHeading = pathname.includes('/puzzle/') && pageHeading
  return (
    <>
      <h1
        className={clsx(
          'text-xl font-medium',
          withPageHeading ? 'block md:hidden' : 'hidden'
        )}
      >
        {pageHeading}
      </h1>
      <div
        className={clsx(
          'items-center',
          withPageHeading ? 'hidden md:flex' : 'flex'
        )}
        data-cy="ik logo"
      >
        {/* Left logo */}
        <Link
          to={routes.home()}
          className="inline-block max-w-[100px] sm:max-w-[150px]"
          aria-label="return home"
        >
          <picture>
            <source srcSet={`${LogoHeader1x} 1x, ${LogoHeader2x} 2x`} />
            <img
              src={LogoHeader1x}
              alt="Infinity Keys logo of a spooky eye in triangle."
            />
          </picture>
        </Link>
      </div>
    </>
  )
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const { isAuthenticated } = useAuth()

  // Close menu when route changes (ie, user click internal link)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname, hash])

  // do not display the navbar if the user is on the landing page
  if (pathname === '/') return null

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-brand-gray-primary">
      <div className="mx-auto max-w-8xl px-4 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* On puzzle or step pages, the rewardable name should replace logo on mobile */}
          <Logos />
          <div className="flex shrink-0 gap-4">
            <DesktopNav />
            <div className="hidden lg:block">
              <WalletButton size="small" />
            </div>
            <div className="w-24 text-center">
              <Button
                size="small"
                fullWidth
                to={routes.rewardableForm()}
                round
                solid
              >
                Create
              </Button>
            </div>

            {/* Menu open button */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu."
              className="text-white lg:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Modal Menu */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[60]"
          onClose={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 max-h-screen overflow-y-scroll">
            <div className="flex min-h-full items-center justify-center p-4 pt-12 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform transition-all">
                  <div className="relative rounded-lg border-2 border-brand-accent-primary/20 bg-brand-gray-primary text-center align-middle">
                    {/* Close button */}
                    <button
                      className="absolute right-2 top-2 rounded p-2 text-white/30 hover:bg-black/20 hover:text-brand-accent-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>

                    {/* Menu panel logo */}
                    <div className="absolute top-0 left-1/2 max-w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-accent-primary/20 bg-brand-gray-primary p-1 shadow-md shadow-black/50">
                      <img src={LogoFullSm} alt="" className="w-full" />
                    </div>

                    <nav className="mt-7 flex flex-col items-center p-6">
                      {/* Navigation links */}
                      <NavTitle text="Navigation" />
                      <Link
                        to={routes.play()}
                        className="header-nav--link mt-2 py-2 px-4 text-xl font-medium text-white transition-colors hover:text-brand-accent-primary"
                      >
                        Play
                      </Link>

                      {/* Wallet and profile buttons */}
                      <NavTitle text="Connect" />
                      <div className="mt-7 flex items-center justify-center gap-4">
                        <WalletButton size="small" />

                        {isAuthenticated ? (
                          <Button round size="small" to={routes.profile()}>
                            Profile
                          </Button>
                        ) : (
                          <Button
                            href={`${CLERK_SIGNIN_PORTAL_URL}`}
                            round
                            size="small"
                          >
                            Login
                          </Button>
                        )}
                      </div>

                      {/* Social Icons */}
                      <NavTitle text="Social" />
                      <div className="mt-7 flex justify-center gap-4">
                        {socialLinks.map(
                          ({ href, testing, ariaLabel, icon }) => (
                            <a
                              key={href}
                              className="text-white/40 transition-colors hover:text-brand-accent-primary"
                              data-cy={testing}
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={ariaLabel}
                            >
                              {icon}
                            </a>
                          )
                        )}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Header

const NavTitle = ({ text }: { text: string }) => {
  return (
    <div className="mt-7 flex w-full items-center gap-4 text-sm uppercase text-brand-accent-primary before:block before:h-[1px] before:flex-1 before:bg-brand-accent-primary/20 before:content-[''] after:block after:h-[1px] after:flex-1 after:bg-brand-accent-primary/20 after:content-['']">
      {text}
    </div>
  )
}
