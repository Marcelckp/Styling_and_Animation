# Parallax

# What is parallax?

This effect can be noticed when different elements of a page move at different speeds and or directions (When interacted with: scrolling; mouseover; focus; etc...) — creating a 3D depth effect.

An example of this effect is a background image that is held in place while content moves over it. (The background image can also move slightly on interaction)

**_Another example is elements on a page scrolling at faster and slower velocities relative to each other and the page scroll._**

<video src="https://cdn.sketch.com/assets/blog/parallax-effect-apple-site.mp4" width="600" height="600" controls></video>

<video src="https://cdn.sketch.com/assets/blog/parallax-effect-beercamp.mp4" width="600" height="600" controls></video>

[<font color=cyan>Parallax animation resource</font>](https://www.sketch.com/blog/what-is-a-parallax-effect/)

<br />

This is a powerful modern design tool that allows us to create eye catching aesthetic components and websites that targets user focus and give them a sense of scale and 3D depth over applications.

<br />

Let's go over a parallax and [ThreeJS](./ThreeJS/ThreeJS.md) example. In this example we use 3 text containers and 1 3D model canvas container positioned on top of each other these to display different content and to mask the text over the 3D model.

The containers are z Indexed over one another in this position.

![](./assets/ContainerOverlayExample.jpg)

The blur text is used for the glow effect the filled text is for the background text behind the 3D model and the outlined text is for the foreground text.

<font color=gold>There is no text masking happening here the foreground text is outlined and is placed on top of the filled text which gives it the appearance that the text outline being shown by the 3D model is a mask but its simply the 3D model blocking the filled text from the background which will show the outlined in front of it, causing it to have the effect</font>

[Here is the finished product](https://codepen.io/miroleon/pen/MWzxdqr)

<br />

<hr />
