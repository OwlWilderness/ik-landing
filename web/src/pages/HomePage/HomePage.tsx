import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react'

import { LensIcon } from '@infinity-keys/react-lens-share-button'
import clsx from 'clsx'

import { Link, routes, useLocation } from '@redwoodjs/router'

import Fade from 'src/components/Animations/Fade'
import BenefitCard from 'src/components/BenefitCard/BenefitCard'
import Button from 'src/components/Button'
import HomeContactForm from 'src/components/HomeContactForm/HomeContactForm'
import OpportunityCard from 'src/components/OpportunityCard/OpportunityCard'
import Seo from 'src/components/Seo/Seo'
import compass from 'src/images/compass.webp'
import computer from 'src/images/computer.webp'
import controller from 'src/images/controller.webp'
import heroLogo from 'src/images/full-logo-2x.webp'
import heroLogoLg from 'src/images/full-logo-lg.webp'
import key from 'src/images/key.webp'
import puzzle from 'src/images/puzzle.webp'
import union from 'src/images/union.webp'
import DiscordIcon from 'src/svgs/DiscordIcon'
import RedditIcon from 'src/svgs/RedditIcon'
import TwitterIcon from 'src/svgs/TwitterIcon'

import '@infinity-keys/react-lens-share-button/dist/style.css'

const CLERK_SIGNIN_PORTAL_URL = process.env.CLERK_SIGNIN_PORTAL_URL

if (!CLERK_SIGNIN_PORTAL_URL) {
  throw new Error('Missing CLERK_SIGNIN_PORTAL_URL variable')
}

export type BenefitCardProps = {
  icon: string
  title: string
  description: string
  list: string[]
}

export const benefits: Array<BenefitCardProps> = [
  {
    icon: key,
    title: 'Players',
    description:
      'Seek adventure and collect artifacts in creator-built keyhunt puzzle games.',
    list: [
      'Collect addictive digital keys',
      'Conquer the leaderboards',
      'Display achievements',
      'Learn new skills',
      'Explore new worlds',
    ],
  },
  {
    icon: compass,
    title: 'Creators',
    description:
      'Use no-code keyhunt tools to take players on your creative adventures.',
    list: [
      'Create-to-earn incentives',
      'No-code game construction',
      'Use any digital asset',
      'Customize story and art',
      'Game discovery engine',
    ],
  },
  {
    icon: union,
    title: 'Sponsors',
    description:
      'Independent creators build keyhunt puzzle games featuring your collections.',
    list: [
      'Retroactive NFT Utility ',
      '(re)Engage communities ',
      'Offset creator incentive costs ',
      'Decentralized content ',
      'User discovery engine',
    ],
  },
]

export type OpportunityCardProps = {
  image: string
  title: string
  description: string
}

export const opportunity: Array<OpportunityCardProps> = [
  {
    image: computer,
    title: '$231B',
    description: 'Expected NFT space market cap in 2030',
  },
  {
    image: controller,
    title: '$133B',
    description: 'Expected web3 gaming sector market cap in 2033',
  },
  {
    image: puzzle,
    title: '$2B',
    description: 'Retroactive NFT utility at low 2023 values',
  },
]

const socialLinks = [
  {
    href: 'https://lenster.xyz/u/infinitykeys',
    testing: 'lens',
    ariaLabel: 'visit IK Lenster.',
    icon: <LensIcon height={32} width={32} />,
  },
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
  {
    href: 'https://www.reddit.com/r/infinitykeys/',
    testing: 'reddit',
    ariaLabel: 'visit the IK subreddit.',
    icon: <RedditIcon />,
  },
]

const Container = ({
  pySm = false,
  noPx = false,
  noPt = false,
  bgLight = false,
  children,
}: PropsWithChildren & {
  pySm?: boolean
  bgLight?: boolean
  noPx?: boolean
  noPt?: boolean
}) => {
  return (
    <div className={clsx({ 'bg-white/5': bgLight })}>
      <div
        className={clsx(
          'mx-auto max-w-xs md:max-w-8xl',
          // pySm ? 'py-8 lg:py-20' : 'py-14 lg:py-24',
          !noPx && 'px-4 lg:px-12',
          {
            'py-8 lg:py-20': pySm && !noPt,
            'py-14 lg:py-24': !pySm && !noPt,
            'pb-14 lg:pb-24': noPt,
          }
        )}
      >
        {children}
      </div>
    </div>
  )
}

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const formRef = useRef<{ scrollToElement: () => void }>()
  const workRef = useRef<HTMLElement>(null)
  const { hash } = useLocation()

  const handleScrollToForm = () => {
    setIsFormVisible(true)
    if (formRef.current) {
      formRef.current.scrollToElement()
    }
  }

  useLayoutEffect(() => {
    if (hash === '#works' && workRef.current) {
      // Wait for mobile nav to remove `overflow: hidden` from html tag
      // before scrolling to element
      const timeout = setTimeout(() => {
        workRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 300)

      return () => clearTimeout(timeout)
    }

    if (hash === '#waitlist') {
      handleScrollToForm()
    }
  }, [hash])

  return (
    <div>
      <Seo title="Home" />

      <div className="relative mx-auto flex max-w-8xl flex-col items-center overflow-x-hidden pt-20 md:mt-0 md:min-h-screen md:flex-row md:justify-between">
        <Container noPx pySm>
          <div className="relative z-10 max-w-xs pr-4 pl-4 md:pr-0 lg:max-w-md lg:pl-12">
            <h1 className="text-shadow-lg text-3xl font-semibold lg:text-5xl xl:text-6xl">
              <Fade inline duration={1.2}>
                Your NFTs
              </Fade>{' '}
              <Fade inline delay={0.6} duration={1.2}>
                are <span className="text-brand-accent-primary">the Keys</span>
              </Fade>
            </h1>

            <Fade delay={0.9}>
              <p
                className="text-shadow-lg mt-4 text-lg leading-tight lg:text-2xl"
                data-cy="description"
              >
                Infinity Keys creators build no-code NFT-collecting games.
              </p>
            </Fade>

            <Fade delay={1.2}>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <Button round solid onClick={handleScrollToForm}>
                  <span className="hidden md:inline">Join&nbsp;</span>
                  Waitlist
                </Button>

                <Button
                  round
                  to={routes.puzzleLanding({ slug: 'the-society' })}
                >
                  <span className="hidden md:inline">Play&nbsp;</span>
                  Demo
                </Button>

                <Button round href={`${CLERK_SIGNIN_PORTAL_URL}`}>
                  Login
                </Button>
              </div>
            </Fade>
          </div>
        </Container>

        <div className="relative z-0 w-full md:max-w-xl lg:-mt-20 lg:max-w-3xl xl:max-w-4xl">
          <Fade delay={0.9}>
            <picture>
              <source srcSet={`${heroLogo} 1x, ${heroLogoLg} 2x`} />
              <img
                src={heroLogo}
                alt="Infinity Keys logo of a spooky eye in triangle."
                className="block w-full"
              />
            </picture>
          </Fade>
        </div>
      </div>

      <section
        ref={workRef}
        className="relative z-40 -mt-[100px] scroll-mt-28 bg-gradient-to-b from-white/0 to-white/5"
      >
        <Container noPt>
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center lg:gap-6">
            {benefits.map((data, index) => (
              <BenefitCard {...data} key={data.title} delay={index * 0.3} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container pySm>
          <Fade>
            <h2 className="pb-12 text-3xl font-semibold lg:text-5xl">
              Opportunity
            </h2>
          </Fade>
          <Fade>
            <p className="max-w-xl text-sm lg:text-lg">
              Infinity Keys taps into the UCG and web3 gaming sectors giving
              projects and creators more attention and audience
            </p>
          </Fade>
        </Container>

        <Container bgLight>
          <div className="flex flex-col items-center gap-20 md:flex-row md:items-stretch md:justify-between md:gap-6">
            {opportunity.map((data, index) => (
              <OpportunityCard {...data} key={data.title} delay={index * 0.3} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container pySm>
          <Fade>
            <h2 className="text-3xl font-semibold lg:text-5xl">
              There&apos;s treasure everywhere.
            </h2>
          </Fade>

          <Fade>
            {!isFormVisible && (
              <div className="pt-12">
                <Button round solid onClick={handleScrollToForm}>
                  Join Waitlist
                </Button>
              </div>
            )}
          </Fade>
        </Container>

        {isFormVisible && (
          <Container bgLight>
            <div className="flex items-center justify-center">
              <HomeContactForm ref={formRef} />
            </div>
          </Container>
        )}
      </section>

      <footer className="bg-white/5 px-4 py-16">
        <div className="flex justify-center gap-8">
          {socialLinks.map(({ href, testing, ariaLabel, icon }) => (
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
          ))}
        </div>
        <div>
          <p className="mt-8 text-center text-base text-white/50">
            &copy; 2022 - {new Date().getFullYear()} Infinity Keys. All rights
            reserved. |{' '}
            <Link
              to={routes.privacyPolicy()}
              className="inline-block underline transition hover:text-brand-accent-primary"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
