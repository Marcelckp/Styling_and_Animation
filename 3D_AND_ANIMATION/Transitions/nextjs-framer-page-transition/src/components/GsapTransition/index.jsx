import { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "../../../context";

export const Transition = ({ children, key }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const { timeline } = useContext(TransitionContext);
  //   const animationContainer = useRef(null);

  // Basic delay animation
  //   useEffect(() => {
  //     /**
  //      * This will run when the component is mounted and when the children prop changes (when the page changes as the children represent the page component)
  //     * When it runs we will delay the switching of the component visually by 2 seconds to allow the exit animation to play.
  //     * Note we will have switched to the new route in the DOM but the exit animation will still be playing and we will still see the old page until the exit animation is done.
  //     */

  //     setTimeout(() => {
  //       setDisplayChildren(children);
  //     }, 2000);

  //     return () => {
  //       // Clean up
  //     };
  //   }, [children]);

  // Exit animation
  useGSAP(() => {
    // This control flow states that we will only perform this animation if the children prop has changed and the key of the children prop is different from the key of the displayChildren prop which is the current page component. Meaning we will only perform the animation if we are switching pages.
    if (children.key !== displayChildren.key) {
      //   // This animation states we will animate the opacity of the animation container to 0 to fade it out and then switch the page component and play its entrance animation.
      //   gsap.to(animationContainer.current, { opacity: 0 }).then(() => {
      //     setDisplayChildren(children);

      //     window.scrollTo(0, 0);

      //     // Reset opacity to 1 so that the new child component is visible
      //     gsap.to(animationContainer.current, { opacity: 1 });
      //   });

      // Play the timeline exit animation that is specific to the page component and then switch the page component and play its entrance animation
      timeline.play().then(() => {
        setDisplayChildren(children);
        window.scrollTo(0, 0);
        timeline.pause().clear();
      });
    }
  }, [children]);

  // Entrance animation -> Played on component mount
  //   useGSAP(() => {
  //     gsap.to(animationContainer.current, { opacity: 1 });
  //   });

  return (
    <div
      //   ref={animationContainer}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "40px",
        justifyContent: "center",
        alignItems: "center",
        // opacity: 0,
      }}
    >
      {displayChildren}
    </div>
  );
};
