const item = document.querySelectorAll(".nav-item");

gsap.defaults({ duration: 0.3 }); // This will set the default duration for all animations to easily make our animations faster if we need it or to make them more consistent.

item.forEach((el) => {
  // We are specifically creating a timeline for each element in our navigation menu example
  // This needs us to select the specific elements h3 and dot element to use in the animation when the specific element is hovered
  const hoverTL = gsap
    .timeline({ paused: true }) // This will start our entire timeline in a paused state
    .to(el.querySelector(".nav-item h3"), {
      color: "red",
      transformOrigin: "left center",
      scale: 1.8,
    })
    .to(
      el.querySelector(".nav-item .dot"),
      { backgroundColor: "red", scale: 0.5 },
      "<"
    );
  el.addEventListener("mouseenter", () => {
    hoverTL.play();
  });

  el.addEventListener("mouseleave", () => {
    hoverTL.reverse();
  });
});

// =========================================================================================
// Button pulse animation

const btnAni = gsap.to(".youtube-button", {
  scale: 1,
  repeat: true,
  duration: .5,
  ease: "linear",
  paused: true,
  yoyo: true,
  repeat: -1,
});

document.querySelector(".youtube-button").addEventListener("mouseenter", () => {
  btnAni.play();
});

document.querySelector(".youtube-button").addEventListener("mouseleave", () => {
  //   btnAni.reverse();
  btnAni.pause();
  gsap.to(".youtube-button", {
    scale: 0.8,
    duration: 0.3,
    ease: "power2.inOut",
    overwrite: true, // Overwrite will make sure that the animation will not be interrupted by the previous animation on the Youtube button. Without this the original animation will continue to play and this will just add an animate to the previous ones timeline
  });
});
