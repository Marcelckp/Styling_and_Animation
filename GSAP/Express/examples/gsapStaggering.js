gsap.to(".star", {
  stagger: 1, // If we less the stagger value we will see the stars movement overlapping
  x: 750,
  rotation: 360,
  fill: "cyan",
  duration: 3,
});


// Stagger example with stagger object
gsap.to('.blue-star', {
  stagger: {
    // amount: 1,
    each: 0.5,
    from: 'center', // "end", "start", "edges"
    // grid: 'auto',
    duration: 3,
    },
  ease: 'bounce',
  x: 750,
  rotation: 360,
  fill: 'cyan',
  duration: 3,
});