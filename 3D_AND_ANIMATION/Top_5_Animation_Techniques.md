# Top 5 animation techniques

1. Scroll tracking.

   Tools we can use to achieve this:

   - ScrollTrigger from GSAP

   - useScroll hook from framer motion

    These animations are often very stuttery since the scroll of a mouse is not a smooth interaction. (unless you are using the logitech mouse velocity scroll wheel) <font color=gold>Since this is a big issue within web applications and desktop application we need to use a smooth scroll technique or **_Locomotive_** scroll to allow the scroll to have velocity and not be stuttery when we stop scrolling. This will give our scroll momentum and keep it moving for a little while after we stop scrolling until it comes to a smooth stop.</font> Here are a few scrolls we can use:

    - [Lenis scroll](https://lenis.darkroom.engineering/)

    - [Locomotive scroll](https://scroll.locomotive.ca/docs/#/) [DEMO](https://scroll.locomotive.ca/demo/)

2. View port detection

    This is a concept that involves starting animations and interactions when an element enters the view port. These can be done with the native **Intersection Observer API** or the ***`useInView hook from framer motion`*** or the ***`Scroll trigger from GSAP`***

3. Sticky element positioning

    This is a technique that involves using the css native sticky position to achieve clean layouts and animations. This is the easiest technique but give the best results that take a lot of thinking and creativity to create.

4. Easing 

    This is the polish around the animations this will set the mood, character and vibe of the animation and application. This is where the rise of motion design can be seen in web development. ***You should master motion design techniques***. This can be used within the animations and timelines styling.

    This can also be used with mouse positioning and the [LERP functionality to achieve this easing effect on the web with interactions](./3D_AND_ANIMATION.md#what-is-linear-interpolation-and-how-is-it-useful-to-us-lerp)

5. Text splitting

    This is the concept of splitting text into lines to perform animations on typography. This can break things down by line, character or paragraph to create these animation.

    We can achieve this by using the ***GSAP module - `SplitText`***. We also have to be careful with this technique as it will affect our accessibility. There's a lot to be careful with this technique for example around code resize events.

BONUS TECHNIQUES

1. Mathematical Map functions

    This function <font color=gold>Will transform a range of values into another range of values</font>

    For example:

    ```js
    const num = 5;

    console.log(num.map(0,10, -50, 50)) // 0
    console.log(num.map(-20, 0, -100, 100)) // 150
    ```

    ***An application of these would be to take the scroll position value and map it to another range of values to use for animation scrubbing, scaling or transforming.***

    [Here is the original video where these techniques are spoken about](https://www.youtube.com/watch?v=9eHEOAn2FOA&list=PLgK9MCRnYB1B8dYTP0keUeW0mSIenFtks&index=60)

2. [LERP](./3D_AND_ANIMATION.md#what-is-linear-interpolation-and-how-is-it-useful-to-us-lerp)

    Linear interpolation - goes hand in hand with the request animation frame to create smooth interpolation between shapes. (Interpolating is the insertion of something of a different nature into something else)

    ```js
    const lerp = function(start, end, t) {
        return start * (1 -t) + end * t
    }
    ```

3. [Shaders](./Shaders/Shaders.md)

    This is used to create experimental, fun and artistic animations.

    This goes hand in hand with 3D on the web. We can use this to create vertex deformations or fragment shaders to add unique dimensions to applications.

<br />

<br />

<br />

<hr />

## Here are my top go to resources and channels for 3D and animation content:

<br />

- [Olivier Larose](https://www.youtube.com/@olivierlarose1)

- [Miro Leon](https://www.youtube.com/channel/UCWBnAcqKfM_hBx_XgpP97Tg)

- [Juxtopposed](https://www.youtube.com/@juxtopposed)

- [CodeGrid](https://www.youtube.com/@codegrid)

- [Minh Pham](https://www.youtube.com/@MinhPhamDesign)