const tween = gsap.to("#triangle", {
  duration: 5,
  x: 900,
  ease: "bounce",
  paused: true, // This will initialize the animation in a paused state
});

// Controlling animations via DOM interactions
document.querySelector("#play").addEventListener("click", () => tween.play());
document.querySelector("#pause").addEventListener("click", () => tween.pause());
document
  .querySelector("#restart")
  .addEventListener("click", () => tween.restart());
document
  .querySelector("#reverse")
  .addEventListener("click", () => tween.reverse());
