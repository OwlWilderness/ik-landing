import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="ik-page flex flex-col items-center justify-center min-h-screen relative">
      <Head>
        <title>Infinity Keys</title>
        <meta name="description" content="Keys keys keys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="/bg.jpeg"
        alt="random background image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center z-10">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          Infinity Keys
        </h1>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t z-10">
        <p>
          Photo by{" "}
          <a href="https://unsplash.com/@socialcut?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            S O C I A L . C U T
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/colorful?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
