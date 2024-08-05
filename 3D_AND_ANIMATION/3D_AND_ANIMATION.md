# 3D and Animation

<br  />

### 3D and Animations on platforms

3D animations, 3D Object rendering and 2D animations can both be created with the `<canvas>` element

### Spline (High level) and ThreeJS(Low level) are both 3D platform APIs that are WORTH learning!

#### Here is some context

**If you're a designer looking for a user-friendly tool to create 3D designs, Spline might be the better choice.** (This can be used to create once off simple animations and scenes where you can use drag and drop)

**If you're a developer looking to create complex, interactive 3D experiences with code, Three.js might be the better choice.**

# Theatre JS

[Here is a case study resource for a motivation for using this tool on a project](https://www.awwwards.com/case-study-deso-by-studio-freight.html)

[Here is a very over the top creative website that involves theatre JS to create a complex scrolly telling scene](https://activetheory.net/) Theatre JS is also used here to incorporate the 3D elements and Cursor particle effects.

### Summary

This is a tool solution that offers a unique approach to _integrating detailed, timeline-based animations with 3D objects managed by Three.js_. This tool is POWERFUL for creative development.

### What is theatre JS

This is a JS library that is used to create interactive animations and motion graphics. It provides a powerful and intuitive interface for animating objects and integrates well with web technologies.

With Theatre JS you can create `scrollytelling` journeys for 3D animations with these steps:

1. Set up your 3D scene:

Initialize your scene, camera and renderer.

Add all of your 3D objects and environments you plan to animate.

2. Integrate Theatre.js:

<font color=gold>Install into your repo. Create a theatre.js project and object for each Three.js object you want to animate</font>.

3. Create the animation:

<font color=gold>Use Theatre.js to define animations for your objects. This could involve:

- Moving the objects.

- Changing their colours.

- ETC

</font>

<font color=magenta>These (Theatre.JS) animations are `STRICTLY TIMELINE BASED` Making it easy to synchronize multiple animations or adjust them based on user interaction.
</font>

4. Control animations with Scroll:

**Use scroll event listeners or a library like ScrollTrigger from GSAP to detect scroll progress**

<font color=cyan>**NB:** As the user scrolls on the page, we will update the progression of the Theatre.js animations accordingly.</font>

<br />

_This will create a narrative and story telling journey as the user scrolls through the page._

<br />

6. Optimize and Polish:

Ensure the animation runs smoothly and is performant. We can add additional interactivity or effects to expect the scrollytelling experience.

### Here is a code snippet example:

```js
// Assuming a Three.js object named `cube`
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

// Theatre.js setup
const project = theatre.getProject("ExampleProject", { autoCreate: true });
const object = project.getObject("CubeAnimation", {
  props: {
    x: 0,
    y: 0,
    z: 0,
  },
});

// Link Theatre.js animation to Three.js object
object.onValuesChange((values) => {
  cube.position.set(values.x, values.y, values.z);
});

// Create an animation timeline in Theatre.js
const timeline = project.getTimeline("ScrollTimeline");
timeline.addKeyframes("CubeAnimation", {
  "0s": { x: 0, y: 0, z: 0 },
  "10s": { x: 5, y: 5, z: 0 }, // Example: Move cube over 10 seconds
});

// Scroll event to control Theatre.js timeline
window.addEventListener("scroll", () => {
  const scrollPercentage =
    window.scrollY / (document.body.offsetHeight - window.innerHeight);
  const time = scrollPercentage * 10; // Assuming a 10 second animation
  timeline.setTime(time);
});

// Three.js render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

# 3D Concepts

All 3D exists within the `<canvas>` element.

<font color=gold>We can use this element To create 3D Isometric or Orthographic views of scenes and or objects</font>

These 3D tools can be used to create the following functionality:

- These can be used as fixed page overlays for mouse interactions, animations and follow path animations.

- We can create a storytelling animation journey within our 3D canvas to create scrollytelling experiences. These will be fixed to the page and scrolling will not perform scrolling on the page but will trigger the animation journey withing the 3D animation scene.

- We can use 3D animation spaces and ScrollTrigger from GSAP (Or scrolling in _spline_) to scrub animations and **_VIDEOS_** to create unique UI UX Designs.
  These video scenes can be created with tools like [Blender](https://www.blender.org/)

<font color=lightgreen>The canvas will always be used for the 3D content so we can keep it in place to provide overlays, 3D Renders of objects to view in orthographic or isometric view. We can provide stories, games and videos with states and interactions to create dynamic spaces within our canvas space as well.</font>

<font color=magenta>This IS HOW ALL ANIMATIONS AND 3D STORIES ARE CREATED AND ALL BUILD UPON THESE CONCEPTS.</font>

<br />

<br />

<hr />

### Animation Libraries and links

- [<font color=magenta>GSAP Scroll trigger</font>](https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1)

- [<font color=magenta>Locomotive scrolling</font>](https://locomotivemtl.github.io/locomotive-scroll/)

- [<font color=magenta>Theatre JS</font>](https://www.theatrejs.com/)

- [<font color=magenta>Anime.JS</font>](https://animejs.com)

<br />

<br />

# What is scrolly telling?

`"Scrollytelling"` describes online longform stories characterised by audio, video, motions and animation effects triggered by simply scrolling a page.

<br />

### How to achieve scrolly telling with containers and canvas elements.

The canvas remains unchanged and fits the entire device view port. The scroll triggering is tied to the container the canvas is used within. This means we have a element that we can use to detect scroll to perform actions, state changes, effects and or camera manipulations, etc on our 3D model/scene.

Here is an example of what this break down looks like. If you remove all elements from a page you can see that the page still needs to have a LONG height to be able to trigger the animation experience within the webpage. 

<video src="./assets/3D_Journey_with_3D_model.mov" width="600" height="600" controls></video>

If you remove the container height then there will be no element to scroll as it is impossible to scroll within a canvas element.

**The canvas does not have the capability to handle scrolling, as it is a single, flat image surface that scripts can draw onto to create images and 3D experiences. Therefore we cannot scroll in a canvas to make scrollytelling experiences we need a larger parent container to detect the events.**

### <font color=gold>***HOWEVER We can give our canvas elements controls and states to assign movement characteristics to them and create a game of sorts. This will be something that creates game like environments and is the basic building blocks of games of the web and games on native platforms like PC and Consoles***</font>

<br />

# What is linear interpolation and how is it useful to us? (LERP)


This is a technique <font color=gold>***that allows us to calculate intermediate values between two points or numbers. For example it can be used to bring a value closer to another by a certain percentage so that we can ease an animation as it gets closer to the point***</font>

TO ELABORATE

Let's say we want to animate a div from one side of the page to our cursors position. Without lerp this would happen instantly and we would have a staggered animation that would be to quick in following the mouses position it would practically be on top of the mouse at all time.

<video src="./Assets/NoLerpEasingMouseMovement.mov" width="600" height="600" controls></video>


<font color=magenta>***LERP*** will allow us to move the div closer to the cursor by the intermediate value that will bring it closer to the cursor on every animation frame in the DOM</font>

We would calculate how far the object will need to move to get closer to the cursor on each animation frame and it would give us the animation that the div element would be following the cursor and not be directly moving on top of it as the cursor move.

<video src="./Assets/LERPeasingMouseMovement.mov" width="600" height="600" controls></video>

This is what a LERP is used for in this context. [Here is a example of it used in a coding application]

<br />

## LERP's in 3D

This is a way to create smooth transitions or movement of objects. Through interpolation of two values you can create a smooth transition state from one state to another. <font color=gold>*This is essential for achieving realistic animations, camera movements, object transformations and other creative custom features in 3D scenes and animations.</font>

<br />

## Canvas 3D vertex morphing to create a blur effect

<video src="./assets/3D_Vertex_Morphing.mov" width="600" height="600" controls></video>

<br />
