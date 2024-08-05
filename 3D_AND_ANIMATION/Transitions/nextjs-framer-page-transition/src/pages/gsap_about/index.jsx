import Head from "next/head";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useContext } from "react";
import { TransitionContext } from "../../../context";

export default function GSAP_About() {
  const scopedContainer = useRef(null);
  const image = useRef(null);

  const { timeline } = useContext(TransitionContext);
  useGSAP(
    () => {
      const targets = gsap.utils.toArray(["p", image.current]);
      gsap.fromTo(
        targets,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.1 }
      );

      // Add the exit animation to the timeline context
      timeline.add(gsap.to(scopedContainer.current, { opacity: 0 }));
    },
    // The scoped option here is used to scope the animation to the container element so that the animation is only applied to the container element and not the entire page. This will allow us to for example select all <p></p> tags within the scoped container and not the entire page so that we can animate them separately
    { scope: scopedContainer }
  );

  return (
    <div ref={scopedContainer}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>About</h1>
      <div
        className="body"
        style={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}
      >
        <p>
          Fusce tristique nisi eu sodales suscipit. Praesent ante ipsum,
          suscipit eu dapibus in, tincidunt et massa. Sed pulvinar consequat
          elit at placerat. Maecenas bibendum in purus sed hendrerit. Integer
          efficitur mattis consectetur. Sed sagittis tortor non mauris laoreet
          ultrices. Nunc sit amet sem suscipit, accumsan justo sed, laoreet
          odio. Phasellus pharetra arcu nibh, non scelerisque ipsum rutrum quis.
          Fusce quis commodo leo. Mauris ut congue mauris.
        </p>
        <p>
          Duis tempus risus ut est malesuada, sit amet auctor tortor tempus. Sed
          luctus, odio a vulputate elementum, nulla enim bibendum ipsum, in
          ornare elit nisi quis tortor. Nullam quis condimentum tellus. Nullam
          non eros sem. Cras molestie convallis dolor, quis egestas turpis
          congue in. Maecenas ut tellus at nunc consectetur facilisis. Vivamus
          ornare ex a nibh egestas, id euismod mi euismod.
        </p>
        <Image
          priority
          ref={image}
          alt="placeholder image"
          src="https://images.unsplash.com/photo-1720692393334-c2301df7e0c9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={600}
          height={350}
        />
      </div>
    </div>
  );
}
