# Cursor Effects

## Cursor animations and 3D following trails

here is an example of this in action -> [<font color=magenta>Code DROPS.</font>](https://tympanus.net/Tutorials/CustomCursors/index4.html)

This is using the canvas to as a 3D overlay to provide cursor following feed back animations when point of interest are reached.

This sort of following animation can be done with GSAP and html elements if you have a look at this [<font color=gold>EXAMPLE</font>](https://tympanus.net/Development/MotionTrailAnimations/).

And with light weight SVGs and lottie files for the best performance with this [<font color=gold>EXAMPLE </font>](https://tympanus.net/Development/GooeyCursor/)

Here is a code example for SVG Filters:

```html
<div class="cursor">
  <div class="cursor__inner">
    <!-- cursor__inner-box elements come here -->
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="3.2" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
</div>
```

The idea with this animation is simple: create lots of boxes on the page and when we hover with the cursor, show them. Also apply a nice SVG gooey filter to them. The CSS blend mode adds some extra jazz!

This is another example of utilizing SVGs for smooth trail and cursor follow animations [<font color=gold>EXAMPLE HERE</font>](https://tympanus.net/Development/EmitterCursor/)

<br />

<br />
