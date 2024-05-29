# Positions

- **Static Positioning:**

  This is the default position value where elements are positioned according to the natural flow of the DOM

- **Relative Positioning:**

  This is a value that will adjust only the position of the element and does not affect the position of the surrounding elements. It's used to offset and element without any by products.

  This is also used to give a parent point for values to be positioned `absolutely`. If a container is positioned `relative` then an `absolute` element inside that container will be positioned `relative` to the container that is positioned `relatively`.

- **Absolute Positioning:**

  This value states that the element will be positioned `relative` to the nearest **_`relatively positioned OR generally positioned ancestor/parent element`_**, This is different from fixed positioning as `fixed` is relative to the viewport and not another element. _(This is like the difference between rems and ems)_

  **_NOTE:_** <font color=gold>If there is no positioned ancestor for the absolute positioned element then it will use the DOM body as the ancestor in which it will use the viewport like a `fixed` positioned element, BUT it will not remain on the page. It will scroll with the content of the page.</font>

- **Fixed Positioning:**

  This value states that the element will be positioned relative to the viewport which means that it will always remain in view even if the user scrolls on the page.

- **Sticky Positioning:**

  This value states that the element will be positioned based on the user's scroll position. It is treated as `relatively positioned` until a offset position is reached in the viewport. If this position is met the element will then `'stick'` to the page in that offset position. **_(it basically goes from being positioned `relatively` to being `fixed`)._**

Here is an example of what each would look like within a style sheet:

```css
.element1 {
  position: static;
}

.element2 {
  position: relative;
  top: 20px;
  left: 20px;
}

.element3 {
  position: absolute;
  top: 20px;
  right: 20px;
}

.element4 {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.element5 {
  position: sticky;
  top: 0;
}
```

<br />

# Flex Box

Below are a few flex box properties and what they allow us to do:

- **flex-flow:**

  This is a shorthand and allows us to define the `flex-direction` and `flex-wrap` property at the same time

- **flex-grow:**

  This defines a element in the flex boxes ability to grow if necessary. It accepts a proportion that will dictate what amount of space inside the flex box container the element/item will take up.

- **flex-shrink:**

  This property defines the ability for a flex item to shrink if needed for responsiveness.

- **flex-basis:**

  This property defines the default size of a flex item before the remaining space is distributed evenly throughout the flex items.

- **flex:**:

  This is a shorthand for flex-grow, flex-shrink, and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional.

- **align-self:**

  This property allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.

- **(justify-content, align-content, align-items):**

  These property aligns items along a axis. Values: flex-start (default), flex-end, center, space-between, space-around, space-evenly.

  align => (cross axis)

  justify => (main axis)

  The cross and main axis is defined by whatever the flex direction is. If the direction is row then X is the main access and visa versa for the column and Y becoming the main access. The cross will always be the opposite of whatever the main is.

Here is a stylesheet example:

```css
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: center;
}
```

<br />

# Grid
