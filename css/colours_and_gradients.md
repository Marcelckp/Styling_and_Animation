# Colours

There are four main ways to set your colours in CSS:

- With the colour name, ie: 'red', 'green', 'blue', etc...

- With Hex code: #fff, #000

- With rgb() values: rgb(255, 255, 255)

- With rgba() values: rgba(255, 255, 255, 50)

<font color=gold>With the `rgb` and `rgba` we create colours using a collection of colour value mixes and the a stands for alpha which adjusts the opacity of the colour.</font>

**`RedGreenBlueAlpha()`**.

<br />

### Here are a few colour tools

- [Coolers](http://materialui.co/)

- [MaterialUI colours](http://coolors.co/)

- [ColourHunt.co](http://colorhunt.co/)

<br />

# Gradients

Here is a website that you can use to find cool gradients. ([web gradients](webgradients.com))

There are 2 types of gradients:

- Linear (Single direction gradients that are defined by a directional line)

- Radial (Circular gradients)

<br />

How to use them:

```css
div {
  background-image: linear-gradient(yellow, red);
}
```

<br />

**NOTE:** <font color=lightblue>Gradients are background images. Basically they are like `.png`'s' or `.jpeg`'s.</font>

And because of this we can combine our gradients with actual background images fetched from urls:

```css
.bg {
  background: linear-gradient(rgba(192, 57, 43, 0.8), rgba(44, 62, 80, 0.8)),
    url("http://i.imgur.com/tBhfy0L.jpg") 0% 0% / cover no-repeat;
}
```

We can adjust the direction of the linear line in linear gradients using keywords as the first argument to the linear-gradient function:

```css
#element {
  background-image: linear-gradient(to top, yellow, red);
}

#element {
  background-image: linear-gradient(to top left, yellow, red);
}

#element {
  background-image: linear-gradient(to right, yellow, red);
}
```

We can also add additional colours with stop values to further customize our gradients. For example:

```css
#el {
    /* 30% States that we want to position the blue exactly 30% into the gradient */
  background-image: linear-gradient(to right, black, blue 30%, red);
}
```
