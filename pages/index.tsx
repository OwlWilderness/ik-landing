import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
// @TODO: bring in d.ts for this since it does not have types published
import RICIBs from "react-individual-character-input-boxes";

/* Disable ESLint for this file because auth needs full page loading */
/*eslint-disable @next/next/no-html-link-for-pages*/

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  const handleOutput = (output: string) => {
    console.log(output);
  };

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

        <div className="magic-input pt-9">
          <RICIBs
            amount={5}
            handleOutputString={handleOutput}
            inputRegExp={/^[0-9]$/}
          />
        </div>

        <p className="pt-6">- or -</p>

        <div className="auth pt-8">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {!user && !isLoading && (
            <a className="font-bold" href="/api/auth/login">
              Login.
            </a>
          )}
          {user && (
            <p>
              Welcome {user?.given_name}.{" "}
              <a className="font-bold" href="/api/auth/logout">
                Logout.
              </a>
            </p>
          )}
        </div>
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
