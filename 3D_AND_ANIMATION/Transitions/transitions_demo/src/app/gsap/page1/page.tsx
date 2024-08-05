import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl mb-20">GSAP Page 1</h1>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to the GSAP page 1
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <p className="text-center mt-20 text-wrap max-w-screen-md">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
        minus tempora necessitatibus natus impedit quo officia, non, molestiae
        nisi animi ut optio molestias debitis rerum perferendis. Numquam qui
        nulla rerum.
      </p>

      <p className="text-center mt-20 text-wrap max-w-screen-md">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
        minus tempora necessitatibus natus impedit quo officia, non, molestiae
        nisi animi ut optio molestias debitis rerum perferendis. Numquam qui
        nulla rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Facilis voluptates suscipit, necessitatibus nobis ipsum cumque doloribus
        sapiente fugit quas esse omnis sunt repellendus a dignissimos dicta eum
        quia? Deserunt, inventore. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Maxime libero in nobis pariatur veritatis, ad saepe?
        Dignissimos numquam aspernatur commodi velit, eligendi vitae laborum ea,
        iure, impedit voluptatem fugit ullam.
      </p>
    </main>
  );
}
