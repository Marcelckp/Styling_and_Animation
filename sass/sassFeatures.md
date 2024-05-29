# Sass

![](./assets/sass.png)

Sass is a CSS Preprocessor. A Preprocessor is a program that lets you generate CSS from the preprocessor's own unique syntax. **Most of these tools will add some features that don't exist in pure base CSS such as:**

- Mixin

- Nesting selector

- Inheritance selectors

- etc ...

<br />

### Why would you use a preprocessor?

The benefits are:

- Cleaner code with nesting and variable.

- Greater ease of maintenance and organizations as we can separate our files into modules.

- Ability to implement **_logic and calculations within your styles sheets_**!

- Overall improvements to workflows when styling.

<br />

Sass is a scripting lang that allow us to use features and tools that regular CSS doesn't have.

NOTE:

SCSS is short for Sassy CSS

<br />

### Variable

To use variables in Sass you use the `$` symbol and when you want to use the variable you use the `$` symbol to reference it.

ie)

```scss
$color_primary = #fff body {
  // When compiled the variable will be replaced with #fff
  background-color: $color_primary;
}
```

<br />

### Nesting

Nesting is a way for us to structure our selectors. We can nest child selectors inside of the parent selector to easily style it.

HTML

```html
<nav class="navbar">
  <ul>
    <li>Home</li>
    <li>Store</li>
    <li>Contact Us</li>
  </ul>
</nav>
```

```scss
.navbar {
  background-color: orangered;
  padding: 1rem;

  // An alternative here is .navbar > ul
  ul {
    list-style: none;
  }

  // OR .navbar > li
  li {
    text-align: center;
    margin: 1rem;
  }
}
```

<br />

### Mixins

Mixins are used **_To group together multiple CSS declarations for reuse throughout your project._**

<font color=gold>This function offers us code block reusability within our css stylesheets</font>

IE)

```scss
@mixin transform {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

// Using the transform mixin

.navbar {
  background-color: orangered;
  padding: 1rem;
  ul {
    list-style: none;
  }
  li {
    text-align: center;
    margin: 1rem;
    @include transform;
    // This will add the CSS code from the mixin here
  }
}
```

**_We can also get fancy and give our `mixins` parameters to make them more flexible!_**

If we use the variable syntax we can achieve this. It will look like this:

```scss
@mixin transform(＄property) {
  -webkit-transform: ＄property;
  -ms-transform: ＄property;
  transform: ＄property;
}

// When we use the mixin now, we need to specify the property we wish to set on the mixin
li {
  @include transform(rotate(20deg));
}
```

This allows us to modularize our code and lessen the lines we need to write for the same outcome.

<br />

### Functions

These work as functions within normal code! \*\*These function can take multiple arguments and return a single value. We can use this to perform logic within our style sheets.

IE)

```scss
@function add-numbers(＄first-number, ＄second-number) {
  @return ＄first-number + ＄second-number;
}

.box1 {
  // Implementation
  padding: add-numbers(5px, 10px); // => 15px
}
```

<br />

### Partials and Importing

**_Partials and imports in scss_** allow us to break our files into smaller files to focus our styles. We gain all this organizational power with no performance downgrades.

When we create a scss partial files for our different components we need to follow the naming convention of starting our files with _`_ (underscore)`\_

To import in `scss` we use the **_@import_** directive.

IE)

```scss
// Our component style file
_header.scss


// Import usage within another file eg) main.scss
@import 'header';
```

**NOTE:** <font color=gold>When you import a file you do not need to specify the `_` or the `.scss` file extension name. Scss does the file parsing for us during compilation.</font>

<br />

**NB:**

**_The difference between `@import` in `CSS and SASS`. In CSS the import directive makes a request to the server to fetch the information. This increases the amount of requested resources and negatively affects the performance of your web pages. <font color=gold>This does not happen when you are using SASS</font>_**

<br />

### Inheritance and extends

Inheritance works the same way it does in OOP. It is a way for us to allow multiple classes to share a common set of properties with one another. The nature of this feature is the same as `mixins` but this is more structured and not as customizable.

IE)

```scss
// Here is the base button class that we will be creating variants of with inheritance
.button {
  background-color: #0000ff; // Blue
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
}

.button_secondary {
  @extend .button
    background_color: green;
}

.button_tertiary {
  @extend .button
    border-radius: 25px;
}
```

### The & Operator

This operator is used when nesting. It's a code saver that allows us to cut the code lines we need to write for the same outcome.

If you use [**_BEM Naming methodologies_**](http://getbem.com/introduction/) or any other **systematic** naming convention for you class names. This technique can be really powerful.

Here is the html

```html
<button class="btn btn--red">Click me!</button>
```

And here is the basic styles.

```scss
.btn {
  display: inline-block;
  padding: 15px 32px;
}
.btn--red {
  background-color: #ff0000; // Red
}
.btn:hover {
  background-color: #fff; // White
}
```

We can modularize this code by using the `&` to refer to the parent selector name. **This way we do not need to repeat the parent class name constantly.**

This is what it looks like:

```scss
.btn {
  display: inline-block;
  padding: 15px 32px;

  &--red {
    background-color: #ff0000;
  }

  &:hover {
    background-color: #fff;
  }
}
```

### Control Directives

**Control Directives** are used to include styles based on certain control flows. This is **_mainly paired with `mixins`_**.

Here are the common **Control Directives**:

- `@if`

- `@else`

- `@for`

- `@while`

EG)

Example of the `@if and @else` directive.

```scss
@mixin heading($size) {
  @if $size == large {
    font-size: 4rem;
  } @else if $size == medium {
    font-size: 3rem;
  } @else if $size == small {
    font-size: 2rem;
  } @else {
    font-size: 1rem;
  }
}

.h1 {
  @include heading(large);
}

.h6 {
  @include heading(small);
}
```

Example of the `@for` directive.

```scss
@for ＄i from 1 through 5 { // Instead of using through we can use the to keyword -> from 1 to 5 -> for an exclusive loop.
  .list-#{＄i} {
    width: 2px * ＄i;
  }
}

// This directive being invoked will result in the following styles being created =>
.list-1 {
  margin-left: 2px;
}

.list-2 {
  margin-left: 4px;
}

.list-3 {
  margin-left: 6px;
}

.list-4 {
  margin-left: 8px;
}

.list-5 {
  margin-left: 10px;
}
```

Example of a the `@while` directive.

We can combine the loop with scss variables to achieve this logical operation.

```scss
＄i: 1;
@while ＄i < 6 {
  .list-#{＄i} {       
     width: 2px * ＄i;   
  }
  ＄i: ＄i + 1;
}
```

<br />

### Interpolation

Interpolation is basically code ***insertion***. It allows us to insert expressions into our code. <font color=gold>It allows us to use selectors, property names, both quoted and or unquoted strings as variables.</font>

To interpolate an expression we need to wrap the expression using the below syntax

```scss
#{$variable_name}
```

Here is an example of how we can use `interpolation` with a `mixin`:

```scss
// Our mixin can now take more arguments and set them as either properties/keys or values.
@mixin interpolation(＄editable, ＄val, ＄val2, ＄prop1, ＄prop2)
{
    background-#{＄editable}: ＄val;
    position: ＄val2;
    #{＄prop1}: 0px; 
    #{＄prop2}: 0px;
}

// Implementations
.block1{
    @include interpolation("image", url("img.png"), absolute, top, right);
}

.block2{
    @include interpolation("color", lightgray, absolute, top, left);
}
```

During compilation the above implementations will be converted into the below code:

```scss
.block1 {
    background-image: url("img.png");
    position: absolute;
    top: 0px;
    right: 0px;
}
  
.block2 {
   background-color: lightgray;
   position: absolute;
   top: 0px;
   left: 0px;
}
```

#### A few reasons to use Interpolation are:

- We can use dynamically created names as property names or variable names for values.

- It allows us to write highly scalable style sheet code

### Placeholders

A placeholder in scss acts like a class selector. A placeholder uses the `%` symbol to declare it and it can be used the same way `inheritance is used with the @extends` directive.

EG)

```scss
%placeholder {
    width: 100%;
    height: 100%;
}
body {
    @extend %placeholder;
}
p {
    @extend %placeholder;
}
```

This will result in the following code:

```scss
body, p {
    width: 100%;
    height: 100%;
}
```

***NOTE:*** Placeholder selectors are mainly useful when writing a SASS library where each style rule is optional.
