import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import "@/styles/styles.scss";
import { Transition } from "@/components/GsapTransition/";
import { useEffect } from "react";
import { TransitionProvider } from "../../context";

// Framer Motion Example
// export default function App({ Component, pageProps, router }) {
//   return (
//     <div className="main">
//       <div className="header">
//         <Link href="/">Home</Link>
//         <Link href="/about">About</Link>
//         <Link href="/contact">Contact</Link>
//         <Link href="/stairs">Stairs</Link>
//         <Link href="/steps">Steps</Link>
//         <Link href="/ladders">Ladders</Link>
//         <Link href="/inner">Inner</Link>
//         <Link href="/3d_inner">3D Inner</Link>
//         <Link href="/2d_inner">2D Inner</Link>
//       </div>

//       {/*
//         Animate presence here will wait for the motions div wrapper on the page component to finish animating before rendering the new page component that is being navigated to in the router.

//         This means that we will wait for the pages exit animation to play and finish before rendering the new page component. When the new page component is being played we will play the enter animation for the new page component.

//         This will allow us to catch the navigation event and preventing rendering until we are ready to render the new page component.

//         This is how we trigger animations on page changes in React based applications with Framer Motion

//         You can also notice that when we navigate across pages that have different exit and entrance animations we have a smooth transitioning mix of animations and you can see that they are not playing at the same time but rather one after the other and can be used to mix and match exit and entrance animations since the ending exit animation ends with a full black screen and the entrance animation starts with a full black screen.

//         If the same were to be done with GSAP We would need to detect the navigation event and then trigger the exit animation and then trigger the entrance animation when the exit animation is done. This is a bit more complex to do with GSAP than with Framer Motion.
//         */}
//       <AnimatePresence mode="wait">
//         <Component key={router.route} {...pageProps} />
//       </AnimatePresence>
//     </div>
//   );
// }

// GSAP Example
export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    if (window) {
      console.log("ready");

      window.addEventListener("pageswap", (event) => {
        console.log(
          "Page show event triggered this is the event payload -> ",
          event
        );
      });

      window.addEventListener("pagereveal", (event) => {
        console.log(
          "Page show event triggered this is the event payload -> ",
          event
        );
      });
    }

    return () => {
      window.removeEventListener("pagehide", () => {});
      window.removeEventListener("pageshow", () => {});
    };
  });

  return (
    <TransitionProvider>
      <div className="main">
        <div className="header">
          {/* Scroll false we disable the scroll restoration on navigating to new pages */}
          <Link scroll={false} href="/gsap_home">
            Home
          </Link>
          <Link scroll={false} href="/gsap_about">
            About
          </Link>
          <Link scroll={false} href="/gsap_contact">
            Contact
          </Link>
        </div>

        {/* 
          If the same were to be done with GSAP We would need to detect the navigation event and then trigger the exit animation and then trigger the entrance animation when the exit animation is done. This is a bit more complex to do with GSAP than with Framer Motion.
          */}
        <Transition>
          <Component key={router.route} {...pageProps} />
        </Transition>
      </div>
    </TransitionProvider>
  );
}
