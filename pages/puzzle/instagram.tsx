import type { NextPage } from "next";
import Head from "next/head";

import { PuzzlePageProps } from "@lib/types";

import Wrapper from "@components/wrapper";
import NavAvalanche from "@components/nav-avalanche";
import Puzzle from "@components/puzzle";
import { puzzleCount } from "@lib/fetchers";

const Home: NextPage<PuzzlePageProps> = ({ count, puzzleId }) => {
  return (
    <Wrapper>
      <div className="ik-page scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen">
          <Head>
            <title>Infinity Keys</title>
            <meta
              name="description"
              content="Avalanche Summit 2022 Infinity Keys Quest"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <Puzzle count={count} puzzleUri={puzzleId} boxes={false} />
          </main>

          <footer className="ik-front-bottom w-full">
            <NavAvalanche showAvalanche={false} />
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;

export async function getStaticProps(): Promise<{ props: PuzzlePageProps }> {
  const props = await puzzleCount({
    puzzleId: "b870ebd4-b3e1-4892-8117-e6a7726300b7",
  });

  return {
    props,
  };
}
