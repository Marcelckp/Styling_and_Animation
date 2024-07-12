import { useContext, useState, createContext } from "react";
import gsap from "gsap";

const TransitionContext = createContext({});

const TransitionProvider = ({ children }) => {
  /**
   * This global state will be shared across all components in the app and will be used to control the animations of each of the individual components on each page.
   * This is done so that we do not need to define a timeline entrance animation for each of the pages but rather we can define a global timeline that will be used to animate each of the pages on entrance by setting the timeline to play on each page entrance.
   */
  const [timeline, setTimeline] = useState(() => {
    return gsap.timeline({ paused: true });
  });

  return (
    <TransitionContext.Provider
      value={{
        timeline,
        setTimeline,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionContext, TransitionProvider };
