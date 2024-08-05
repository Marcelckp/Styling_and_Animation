# Ray Algorithms

## What are they?

In computer graphics!

Ray based algorithms are techniques that are used to determine how light and reflection details are portrayed within a 3D Scene to simulate the behavior of light yar (and other rays, ie - shadow rays) as they interact with objects. This light simulation can be down with many different algorithm techniques to achieve realistic images.

## Different types of Ray algorithms

- [Ray Marching](#ray-marching)

- [Ray Casting](#ray-casting)

- [Ray Tracing](#ray-tracing)

- [Path Tracing](#path-tracing)

<br />

## Ray Marching

[<font color=gold>Here is a very helpful video that you can replicate to further your understanding of Ray Marching</font>](https://www.youtube.com/watch?v=Cp5WWtMoeKg)

Ray Marching is a rendering technique that involves casting rays from the camera into the scene and iteratively advancing them until they intersect with an object.

*The rays are iteratively ***`Marched`*** along until each ray hits an object or reaches a certain distance.*

**Unlike Ray Casting, which typically checks for intersections with geometric primitives directly, Ray Marching uses a `distance function, often a Signed Distance Function (SDF)`, <font color=gold>to determine how far a ray can safely move towards the nearest surface without missing any geometry.**</font>

<font color=cyan>

This technique is particularly useful for rendering complex or fractal shapes, volumetric effects, and materials with intricate light interactions.

It allows for the creation of detailed and creative visual effects that are not bound by the limitations of polygonal meshes.

</font>

<br />

It uses Signed distance functions (SDF) to define shapes and surfaces within a scene. These functions can be parameterized with vars that change over time, allowing the geometry to evolve dynamically.

#### SDF functions are mathematical functions that return the shortest distance from `any point in space to the surface of an object`. They are used to describe the geometry of objects in a scene.

With parameterization we can change the variables over time, such as the time variable itself or other dynamic inputs like the mouse position. This allows the shape and position of the object to change dynamically based on the parameters.

### When it comes to rendering the final color and shading the pixels, they are computed based on the:

- intersection points: These are the locations where a ray, typically originating from the camera, intersects with objects in the scene. Intersection points determine which objects are visible in the rendered image.

- normals: Normals are vectors that are perpendicular to the surfaces of objects in the scene. They provide information about the orientation and direction of the surfaces. Normals are used in shading calculations to determine how light interacts with the surfaces.

- material properties: Material properties describe how light interacts with different materials. They include characteristics such as reflectivity, transparency, roughness, and color. Material properties are used in shading calculations to determine the final appearance of surfaces.

These values can also change dynamically.

<br />

[Here is an example of the ray marching algorithm](https://www.desmos.com/calculator/ragaytzefw)

<br />

### Ray Marching usages

#### Volumetric Rendering

This can be used to render any volumetric object such as <font color=gold>**clouds, fog, fire, water, and other phenomena without a clear boundary. (seemingly endless boundary) (This refers to any material or object that has a volume quantity)**</font>

#### <font color=gold>*Fractal and Procedural Landscapes*</font>

This can be used to create highly detailed and complex scenes. In combination with a Fly through camera and procedural generation, we can create movie level animations and visual scenes.

#### <font color=gold>*Creative and Artistic Projects*</font>

Due to its flexibility in rendering non-traditional geometries it is useful in creating avangard creative works.

<br />

## Ray Casting

This is a basic technique <font color=gold>Where rays are projected from the viewpoint (the camera or the eye of the observer) into the scene to determine what objects are visible along those rays.</font>

It calculates the intersection of rays with objects in the scene but `does not consider the complex properties of light and how it bounces off our surfaces or other optical effects like, shadows, reflection, or lens light refractions.`

<br />

### Ray Casting usages

#### Visibility Determination

It's used to quickly determine which objects or parts of objects are visible to the camera.

#### Simple Rendering

**_In games and simulations where real-time performance is crucial, and detailed optical effects are not necessary_**

#### Volume Rendering

In medical imaging and scientific visualization, where the internal structure of a 3D data set is projected onto a 2D screen.

<br />

## Ray Tracing

This is a more computationally complex and sophisticated technique that is like `Ray casting` in that it simulates the way light rays interact with surfaces.

**HOWEVER**

<font color=cyan>**_It is different from `Ray casting` as `Ray tracing` takes into account the optical effects produced when light hits surfaces which include:_**

- Absorption of light

- Reflection of light

- Refraction of light

- Object shadows</font>

<br />

<font color=gold>**This is achieved by tracing the path of light as pixels in an image plane and simulating the effects of its encounters with virtual objects.**</font>

<br />

[Here is a ray tracing example](https://www.youtube.com/watch?v=gsZiJeaMO48)

<br />

### Ray Tracing usages

#### Photorealistic Rendering

It's widely used in file, animation, gaming and television to generate visually stunning and highly realistic visual scenes.

#### Optical simulations

In engineering and design, simulations of how light interacts with designed objects is crucial for understanding the visual and functional aspects of a design.

#### Architectural Visualizations

Since we can produce realistic light. We can use it to product realistic lighting effects, including how light disperses through space, reflects off surfaces, and creates shadows, contributing to a more accurate representation of how a space will look.

<br />

## Path Tracing

<font color=gold>`Path Tracing` is an advanced form of `Ray Tracing` (It builds upon `Ray Tracing` and adds extra complexity which normal hardware cannot properly use as yet do to performance limitation, meaning this tech should be used sparingly or knowingly) that simulates the random paths light can take from a light source to the camera, including multiple bounces off surfaces. This technique also considers the material and reflectiveness properties of the material.</font> This technique can produce `highly realistic images with accurate global illumination, soft shadows, and depth of field effects`

### Path Tracing usages

#### High-End film production

For scenes requiring the highest levels of realism.

#### Scientific Visualization

Where accurate representation of light and material interaction is crucial

### Photorealistic Game Rendering

In cutting-edge games, often with the support of powerful GPU hardware.

<br />

# Key differences of each Ray Algorithm

### Complexity and Realism:

`Ray Casting` is the simplest and fastest but least realistic of the algorithms. 

`Ray Tracing` adds realism by simulating basic light interactions.

`Ray Marching` allows for rendering of complex and volumetric scenes.

`Path Tracing` offers the highest realism by accurately simulating light paths.

### Performance:

`Ray Casting` is the most performance-friendly, suitable for real-time applications.

`Ray Tracing` requires more computational power.

`Ray Marching's` performance depends on the complexity of the scene and the step size.

`Path Tracing` is the most computationally intensive, typically used where rendering time is less of a concern. (Mainly used in pre-rendered content)

### Use Cases:

The choice among these techniques depends on the balance between the need for realism, the complexity of the scene, and the available computational resources. 

`Ray Casting` and `Ray Tracing` are more traditional techniques.

While `Ray Marching` and `Path Tracing` offer more advanced capabilities for specific visual effects and high realism.

<br />

# Considerations to make when choosing a strategy

Real-Time vs. Offline Rendering: Real-time applications may use simplified or approximated versions of these algorithms to maintain performance. Offline rendering (e.g., for movies or high-quality stills) can afford the computational cost for higher quality.

Hardware Support: Recent advancements in GPU technology, such as RTX by NVIDIA, offer hardware acceleration for Ray Tracing, significantly improving performance for real-time applications.

<br />

## Path Tracing VS Ray Tracing

`Ray Tracing` is used to add extreme detail to scenes, where `Path Tracing` is better used for global illumination and the shadows created by this illumination, this can be seen in games that use the suns position to create shadows in the immersive game world.

<br />

# Other uses for ray based algorithms

Beyond the use of shaders in WebGL or OpenGL (as discussed in the context of P5.js, Three.js, and Pixi.js), these algorithms can be applied across various mediums and technologies to achieve stunning visual effects. 

Here are some notable mediums and technologies where ray algorithms can be utilized:

#### Compute Shaders and GPGPU Programming

#### Offline Rendering Software

#### AR and VR

#### Procedural Content Generation

#### WebGL and WebGPU