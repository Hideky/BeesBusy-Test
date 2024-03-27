import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

        <div className="grid h-[50vh] place-items-center">
          <div className='text-center text-'>
          <p className='text-4xl mb-4'>
            Welcome
          </p>
          <p>
            This site is a test app for BeesBusy.
          </p>
          </div>

        </div>
    </>
  );
}
