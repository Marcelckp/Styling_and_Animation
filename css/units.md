# Units

## Pixels

```css
p {
  font-size: 10px;
}
```

Pixels are fixed units which allow you to make consistently sized designs. Designs are not normally fixed in size for resize-ability, and when it comes to typography it's definitely not fixed in those cases other units like `%, em, rem`.

## Points and Picas

These are absolute length units like centimeters `cm` and millimeters `mm`.

These units are normally used for prints and other traditional media like PDFs.

Since this is an absolute measurement. The measurement defined is fixed which means the length expressed is exactly that size on the screen. Because of this it is not recommended to use these values as screens vary in sizes drastically.

DON'T DO THIS

```css
p {
  font-size: 12pt;
  /*DO NOT DO THIS!!*/
}
```

NOTE: \*\*The only use case where `points` and `picas` come in handy are for styling web pages for print mediums. This is useful for print and other physical media.

## Ems

_This is a relative font measurement_. In CSS `1em` maps to the users default browser size. In most cases `16px`:

```css
1em = 16px
```

The `1em` could also represent the font size of the parent element.

EG)

```css
p {
  font-size: 2em; /*This is equal to 16px * 2*/
}
```

There is a problem with `Ems` that you need to be aware of. The value for `Ems` scale with the parents font-size. If we have a html document as follows:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>A Simple Page</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="one">
      One Hello World!
      <div class="two">
        Two Hello World
        <div class="three">Three Hello World</div>
      </div>
    </div>
  </body>
</html>
```

If we have the following styles in our `css` file we can see how the font-size will change as we nest in the DOM defined above:

```css
.one {
  font-size: 1.5em; /* 1.5 * 16px (default browser font size) */
}

.two {
  font-size: 1.5em;
  /* 
    Since this is a child of the .one class div
    Means that the font size here will be 1.5 * 24px (the font size of .one)
  */
}

.three {
  font-size: 1.5em;
  /* 
    Since this is a child of the .two class div
    Means that the font size here will be 1.5 * 36px
  */
}
```

### **<font color=gold>NOTICE: that we accumulate the font-size as we nest into the DOM.</font>**

**_In comes rem that resolves this accumulation issue_**

## Rems

This can be called the `root - em`. Since the `em` unit scales according to its parent elements font. This `rem` unit ONLY scales relative to the `root` element in the DOM which is normally your `<html></html>` element.

If we take the same DOM example but change the styles, notice how the font-sizes are set:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>A Simple Page</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="one">
      One Hello World!
      <div class="two">
        Two Hello World
        <div class="three">Three Hello World</div>
      </div>
    </div>
  </body>
</html>
```

```css
.one {
  font-size: 1.5rem;
  /* 
    Now we scale relative to the html font-size
    Which means that the font size here will be 1.5 * 14px (default browser or html set font-size)    
  */
}

.two {
  font-size: 2rem;
  /* 
    Now we scale relative to the html font-size
    Which means that the font size here will be 2 * 14px (default browser or html set font-size)
  */
}

.three {
  font-size: 3rem;
  /* 
    Now we scale relative to the html font-size
    Which means that the font size here will be 3 * 14px (default browser or html set font-size)
  */
}
```

Now our initial issue brought up from using `Ems` is resolved.

**_NOTE: both units have their own use cases!_**

## Exes

These were rarely used. An `ex` unit is equal to the size of the height of the lowercase letter x in the default font size being used.

This can be used to perform _typographical 'magic'_.

## Percentages

This is a unit that is responsive and resizable based on the user.

If the font-size is:

```css
p {
  font-size: 100%; /* This will be equal to 100% of the default font-size settings on the users browser. 
    If we increase this percentage past or below 100% we will manipulate the size of the text relatively
  */
}
```

This relative scaling falls over into a the sizing of elements as well. If a parent container has a size of 80% of the `root <html></html>` container then a child defined within that container that is also sized at 80% it will size the 80% relative to the parent container that has its size based on 80% of the `root <html></html>` element. This means that the child element will have a size of `60% of the root <html></html>` container element. 

Makes sense right? It's all relative! 

## Vh, Vw, D(ynamic)vh, D(ynamic)vw

These are units that are relative to the user's devices viewport height and width measurements. (ie -> the entire device screen)

This is means we do not care about our size relative to the size of our parent. It's sized relative to the `root of the device (ie -> the screen)`.

The difference between this and `%` is the same as the difference between `ems` and `rems`.

## Vmin and Vmax

These are the opposite units to `vh, vw, dvh, dvw` as these are related to the viewport's heights and widths.

`vmax and vmin` <font color=gold>are related to the minimum and maximum of these values.</font>

So if we had a screen that is `750px by 300px` The `vmax => 750px AND the vmin => 350px` 

Which means that:

```css
100vmax => 750px /* and as this 100 value is changed we will scale the pixel size as a result */

/*

  this also means the same is true for vmin
  ie)

  100vmin => 350px

  SO

*/

50vmin => 175px /* Half of the origin viewport width of a mobile phone for this example. */
```