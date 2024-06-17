// To Tween that animates a target to the values specified in the vars object
// This is used to set the end state of the animation
gsap.to("h1", { x: 100, duration: 2, ease: "bounce" });

// From Tween animates a target from the values specified in the vars object to the current values of the target
// This is used to set the start state of the animation
gsap.from(".big-star", { x: 400, y: 100, scale: 3, duration: 3, delay: 2 });

// FromTo Tween animates a target from the values specified in the from object to the values specified in the to object
// This is used to set the start and end states of the animation
gsap.fromTo(
  ".bigger-star",
  { x: 700, y: 100, opacity: 0 },
  { x: 400, y: 100, /* scale: 3, */ duration: 3, opacity: 1, repeat: 2 }
);
