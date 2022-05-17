import type { NextPage } from "next";
import dynamic from 'next/dynamic'
import Head from "next/head";
import Image from "next/image";

import Wrapper from "@components/wrapper";
import NavAvalanche from "@components/nav-avalanche";
import Puzzle from "@components/puzzle";
import { allLandingRoutes, puzzleCount, puzzleCountByRoute } from "@lib/fetchers";

const DevPuzzle = dynamic(() => import('@components/puzzles/dev'));

import { PuzzlePageProps } from "@lib/types";

interface PuzzleParams {
  params: {
    landing: string;
  }
}

const Dev: NextPage<PuzzlePageProps> = ({ count, puzzleId }) => {
  return (
    <Wrapper>
      <div className="ik-page scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen">
          <Head>
            <title>Infinity Keys</title>
          </Head>

          <main className="text-center pt-5">
            <Image
              src="/logo.svg"
              alt="Infinity Keys logo"
              width={100}
              height={62.72}
            />
            <DevPuzzle val={puzzleId} />
            <p className="py-16 text-center text-lg text-gray-100">Dev only</p>
            <Puzzle count={count} puzzleUri={puzzleId} />
          </main>

          <footer className="ik-front-bottom w-full">
            <NavAvalanche showAvalanche={false} />
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dev;

export async function getStaticProps({ params: { landing } }: PuzzleParams): Promise<{ props: PuzzlePageProps }> {
  const route = `/puzzle/${landing}`;
  const props = await puzzleCountByRoute(route);

  return {
    props,
  };
}

export async function getStaticPaths() {
  const routes = await allLandingRoutes()
  return {
    paths: routes,
    fallback: false,
  }
}
