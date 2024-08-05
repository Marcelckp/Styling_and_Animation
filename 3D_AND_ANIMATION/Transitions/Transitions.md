# Page transitions

Page transitions are a fundamental part of web navigation and user experience on web applications, t**hey help create visual continuity, interest and entertain the user while all the assets are loading**.

The perception of fluidity and continuity within your applications is key to superb application design, and animated transitions between views, components, validation interaction and user generated events is the magic of the majority of the SOTDs (sites of the day - awwwards)

### Why use/create them?

They keep the visitors engaged in the product through entertainment. Good motion design and animation design on the web has a place in all application types, including SaaS where it can be used to put polish on your components that your clients will use.

This is a way to give any product a premium feel and UX (User experience).

**_User experience is King!!!!_**

### What is possible?

You can apply morphing on SVGs, shaders, skeuomorphism, fluency, blending and mix blending modes, organic motion, smoke and distortions, masks and may others.

<br />

### Here are good recourse for our needs

[Dribbble page transition inspiration](https://dribbble.com/tags/page-transition)

<br />

## Generic concept

The generic concept to think about when animating transitions is the animation that plays when a page is left and the animation that plays when a page is landed on.

Here is a generic page fading example. Take note of the opacity changes when the page is reloaded and when navigation occurs.

<video src="./assets/Transitions_Example_In_And_Out.mov" width="500px" height="500px" controls></video>

This could either transition directly to another page and have a basic fade or it can have a interim screen that will be used to display an animation and then the interim screen is removed when loading is completed and the page you land ons landing animation is played.

This adds complexity as we will need to create a interim animation component that will be played in many different ways when switching page components.

### Thought process breakdown

When we have fancy animations that need additional components we will show the component when the origin page is navigated away from and then show the newly navigated to page once the animated transition is completed.

This will normally exist as a application wrapper component that will catch all redirects within the application and play the animation therefore.

Here we can determine when to show the animation and the new page component and we have the power to manually change the page components when we wish.

**In vanilla JS we can do this as well by managing our own history stack.**

<br />

## Preloaders

### What are Preloaders?

Preloaders are a type of transitionary component that will be used to display some form of loading that will block the access to the page until the assets on the page have been downloaded and loaded as needed. These loaders can operate when visitors arrive at the site and when they navigate between your pages if there is data that needs to be fetched or large assets like 3D models that are used across all of the pages in your applications.

[Here is a good example of a preloader animation; Notice that the application always plays the preloading animation on visit and page refresh. This means that they have a arbitrary timer with some asset downloading logic to ensure that all content is ready before removing the loader on every load](https://atypikal.co/)

### When can they be used?

These components will more often then not be used on page refreshes to ensure that all your sites content is downloaded so you do not run into Flashes of content (FOC) that has not been correctly loaded.

You can use storage to determine when to show the animation if necessary, since if it has already played you can assume that the content has been downloaded onto the users machine and they are a recurring visitor.

[Take this for example - metalab](https://www.metalab.com/work/headspace)

If you visit their site for the first time you will receive a we create interfaces pre loader and after the animation plays you will see a new value in your local storage called `preloader` this is the identifier that you have seen the loading animation.

If you have an entrance animation that tells the user about the product you can use this technique to display the message experience only once.

If you remove the storage value you will be able to replay the animation on page refresh. **Without the preloader the application just plays the pages entrance animation**, instead of spamming the preloader consistently. We can also assume that if you are a recurring visitor you won't see the preloader as you will have majority of the assets already downloaded and ready to view immediately on page view.

<br />

[Here is an example of view transitions within MPA's](https://github.com/mdn/dom-examples/tree/main/view-transitions/mpa)

[Here is an example of view transitions within SPA's](https://github.com/mdn/dom-examples/tree/main/view-transitions/spa)

<br />

With Chrome 124 we have new APIs that allow us to tap into these transitions frames/states. **_These events are only available within chrome beta._**

- Page Swap Event

  This will be fired on a documents window object when navigation will replace the document (DOM) with a new document.

  ```js
  document.addEventListener('pageswap', event => {

      // This is a catch opportunity to create and use a fall back
      if (!event.viewTransition) {
          return;
      } else
  })
  ```

- Page Reveal Event

  ```js
  document.addEventListener("pagereveal", (event) => {
    // This is a catch opportunity to create and use a fall back
    if (!event.viewTransition) {
      return;
    }
  });
  ```

<br />

## Down sides

**_There is currently no way for creating page transitions with the NextJS App router directory!_**
