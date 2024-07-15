gsap.set("#demo", { scale: 0.7 });

// These all play naturally one after another
// gsap
//   .timeline()
//   .from("#demo", { duration: 1, opacity: 0 })
//   .from("#title", { opacity: 0, scale: 0, ease: "block" })
//   .from("#freds img", { y: 280, stagger: 0.1, duration: 0.8, ease: "back" })
//   .from('#time', {xPercent: 100, duration: 1, ease: "elastic" })

// If we want to manipulate the timeline starting animations we can use the .add() method and the Relative position parameter "-=1" OR "+=1"
// This will add the animation to the timeline at the specified time
gsap
  .timeline()
  .from("#demo", { duration: 1, opacity: 0 }, 0) // The 0 is a absolute position parameter that will add the animation to the timeline at the start
  .from("#title", { opacity: 0, scale: 0, ease: "block" }, "<") // This position parameter "<" will add the animation to the timeline at the same time as the previous animation. We can do this "<0.5" This will add the animation 0.5 seconds after the previous animation has started
  .from(
    "#freds img",
    { y: 280, stagger: 0.1, duration: 0.8, ease: "back" },
    "-=1"
  )
  .from("#time", { xPercent: 100, duration: 1, ease: "elastic" }, "-=1");

// ==========================================================
// Timeline playback and label navigating

const animation = gsap
  .timeline({ paused: true })
  .from("#timeline-demo", { duration: 2, opacity: 0 }, 0) // The 0 is a absolute position parameter that will add the animation to the timeline at the start
  .from("#timeline-title", { opacity: 0, scale: 0, ease: "block" }, "<") // This position parameter "<" will add the animation to the timeline at the same time as the previous animation. We can do this "<0.5" This will add the animation 0.5 seconds after the previous animation has started
  .from(
    "#timeline-freds img",
    { y: 280, stagger: 1, duration: 2, ease: "back" },
    "-=1"
  )
  .add("test") // Adding a test label marker to the timeline
  .from(
    "#timeline-time",
    { xPercent: 100, duration: 5, ease: "elastic" },
    "-=1"
  );

// Controlling animations via DOM interactions
document
  .querySelector("#timeline-play")
  .addEventListener("click", () => animation.play());
document
  .querySelector("#timeline-pause")
  .addEventListener("click", () => animation.pause());
document
  .querySelector("#timeline-restart")
  .addEventListener("click", () => animation.restart());
document
  .querySelector("#timeline-reverse")
  .addEventListener("click", () => animation.reverse());

// In the below code we will be able to navigate to the "test" label marker and play the animation from that point onwards to test a specific section of our animation
document
  .querySelector("#timeline-test")
  .addEventListener("click", () => animation.play("test"));
