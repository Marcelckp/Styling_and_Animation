# Three JS

## Three JS

Alls us to create 3D designs that can be manipulated with Javascript code as it is created with JS libraries like Three.js or Babylon.js. These can be used in combination with GSAP to create more complex animations.

We can use 3JS and GSAP as follows to create a scrubbed 3D animation:

```js
// Create a scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();

// Set the size of the renderer and add it to the page
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry and material for a cube
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Create a cube and add it to the scene
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// ==================================================

// Create a GSAP animation
var animation = gsap.to(cube.rotation, {
  x: Math.PI * 2, // Rotate the cube 360 degrees around the x-axis
  y: Math.PI * 2, // Rotate the cube 360 degrees around the y-axis
  duration: 3,
  paused: true, // Pause the animation initially
});

// =================================================

// Add an event listener to the scroll event
window.addEventListener("scroll", function () {
  // Calculate the scroll progress as a number between 0 and 1
  var scrollProgress =
    window.pageYOffset / (document.body.scrollHeight - window.innerHeight);

  // Set the animation progress to the scroll progress
  animation.progress(scrollProgress);
});

// ================================================

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

<br />

Here is an example of how we can manually animate custom manually created 3D Objects on scroll if we wanted to create our own models and 3D meshes.

[Here is the example resource](https://help.lottiefiles.com/hc/en-us/articles/4887671268249-Sync-Lottie-with-scroll)


<font color=gold>These meshes, animation scenes and 3D objects can be created in tools like spline, blender, or Adobe after effects and can be imported into ThreeJS to achieve this. Otherwise tools like spline have this ability builtin</font>

<br />

Here is another resource that uses different zIndex planes of content placed on top of each other to create a parallax effect when scrolling by controlling the animation of the ThreeJS model on scroll and adjusting the scroll velocity of the other content.

[Here is the example resource](https://www.youtube.com/watch?v=Y5kJFvQtb-U)

<br />

## React Three Fibre

This is a react package that allows us to take advantage of ThreeJS and its capabilities in react applications.

We can use cool life cycle methods with react to make cool browser experiences. For example here we can use the window.screens X and Y position to detect browser application / window movement and move things inside a browser web app

[Here is the immersive example](https://r3f.maximeheckel.com/shaking)

Here is a little code example to show you how the detection works outside of react:

```js
var oldX = window.screenX,
    oldY = window.screenY;

var interval = setInterval(function(){
  if(oldX != window.screenX || oldY != window.screenY){
    console.log('moved!');
  } else {
    console.log('not moved!');
  }

  oldX = window.screenX;
  oldY = window.screenY;
}, 500);
```