import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";

import { MAGIC_CODE_CHAR_COUNT } from "@lib/constants";
import Wrapper from "@components/wrapper";
import MaterialIcon from "@components/svg/material-lock-svg";
import NavAvalanche from "@components/nav-avalanche";
import Puzzle from "@components/puzzle";

interface PageProps {
  count: number;
}

const Home: NextPage<PageProps> = ({ count }) => {
  return (
    <Wrapper>
      <div className="ik-page scanlines">
        <div className="container px-4 flex flex-col items-center justify-center min-h-screen">
          <Head>
            <title>Infinity Keys</title>
            <meta name="description" content="There's treasure everywhere." />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <Puzzle count={count} puzzleUri="landing" />
          </main>

          <footer className="ik-front-bottom w-full">
            <NavAvalanche />
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  return {
    props: {
      count: MAGIC_CODE_CHAR_COUNT,
    },
  };
}
