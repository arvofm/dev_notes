# All Beforehand
_color_: any color, hex, rgb...
_position_: {center/top/bottom/left/right} {center/top/bottom/left/right}
_length_: px, em, rem, vw, vh, %...
_number_: a number where appropriate

# Some Features
* For a children to inherit a value from their parent, set value to "inherit". To force a property to not inherit,
set value to "revert", setting the browser value.
* From any CSS file, to import another CSS file
```css
@import url("./style.css");     /* In any CSS file, import another CSS file */
```
* In the context of an HTML file, using the :root selector points to the html element, except that :root has higher priority.
Adding a custom property to :root makes it available to all the elements.


# Selectors
```css
*                       /* Universal selector, select everything */
h1 + p                  /* Select one <p> coming directly after <h1>, not inside the <h1> */
a[title]                /* Choose <a> with an attribute of title */
article *:first-child   /* First-child of any descendant element of <article> */
.GHC                    /* The ones with a class of GHC (Giant Horse Cock) */
span.GHC.FOSS           /* <span> with classes of GHC and FOSS */
div#ME                  /* <div> with id of ME */
article > p             /* Select only <p> elements that are direct children of <article> elements */
h1 + p                  /* The <p> element that is immediately preceded by a <h1>, adjacent sibling */
h1 ~ p                  /* All <p> elements that come anywhere after <h1>, general siblings */
```

# Pseudo Classes
```css
/* There are some basic ones: */ :first-child :last-child :active :nth-child()
input:invalid           /* <form> elements whose contents fail to validate */
a:link                  /* A link that has not yet been visited */
a:visited
a:hover
input:checked           /* Element that is checked or toggled to an on state */
input:default           /* Selects form elements that are the default in a group of related elements */
:disabled               /* An element is disabled if it can't be activated (selected, clicked on, typed into, etc.) or accept focus */
:enabled                /* An element is enabled if it can be activated (selected, clicked on, typed into, etc.) or accept focus */
:empty                  /* Any element that has no children */
:focus                  /* When the element receives focus */
:focus-within           /* If the element or any of its descendants are focused */
:fullscreen             /* The element which is currently in fullscreen mode */
:is(ol, ul)             /* takes selectors as arguments, and selects any element that can be selected by one of the selectors in that list */
:not(strong)            /* elements that do not match a list of selectors */
```

# Pseudo Elements
```css
/* Self-explanatories: */   ::first-line ::firs-letter ::after ::before
p::selection                    /* applies styles to the parts that are highlighted by the user */
input::placeholder              /* adjust placeholder text */
li::marker {content: '✝';}      /* selects the marker box of a list item, so a list item would look like ✝ peepeepoopoo*/
video::cue                      /* Matches WebVTT cues within a selected element, can be used to style captions and other cues in media with VTT tracks */
```

# Functions
calc(); -> calculates according to its given value
```css
grid-template-columns: repeat(4, 200px);        /* 200px 200px 200px 200px */
grid-template-columns: minmax(200px, 3fr) 9fr;  /* takes 1/4 of the screen and never takes less than 200px */
grid-template-columns: minmax(auto, 50%) 9fr;   /* just set a maximum value */
grid-template-columns: minmax(100px, auto) 9fr; /* just set a minimum value */
width: calc(90% - 30px);
/* Working with variables (they can also be defined inside any element) */
:root {
    --primary-color: blue;
}
color: var(--primary-color, blue);  /* Second parameter is the fallback value */
```

# Text
```css
text-align: start / end / left / right / center / justify;
text-overflow: clip / ellipsis;                                 /* how hidden overflow content is signaled */
text-shadow: _color_ _offset-x_ _offset-y_ _blur-radius_;
text-transform: uppercase / lowercase / full-width / none;
text-wrap: wrap / nowrap / balance;
line-height: _length_;
letter-spacing: _length_;
word-spacing: _length_;
text-decoration-color: _color_;                                 /* text-decoration: ...; would do */
text-decoration-thickness: _length_;
text-decoration-line: none / underline / overline / line-through / blink;
text-decoration-style: solid / double / dotted / dashed / wavy;
text-emphasis-color: _color_;                                   /* text-emphasis: ...; would do */
text-emphasis-position: over / under / right / left;
text-emphasis-style: none / filled / open / dot / circle / triangle;
text-indent: _length_;
writing-mode: horizontal-tb / vertical-rl / vertical-lr;
direction: rtl / ltr;   /* Direction of the text */
```

# Font
```css
font-family: Arial, Helvetica, sans-serif;
font-size: _length_;
font-style: normal / italic;
font-weight: normal / bold / lighter / bolder / _number_;
font-stretch: condensed / normal / expanded;
font-variant: normal / small-caps;
```

# Background
```css
background-image: url("relative path");
background-size: contain / cover / auto;
background-repeat: repeat-x / repeat-y / repeat / space / round / no-repeat;
background-position: _position_;
background-attachment: scroll / fixed / local;
background-origin: border-box / padding-box / content-box;      /* background's origin: from the border start, inside the border, or inside the padding */
```

# Border
```css
border-width: _length_;
border-color: _color_;
border-style: none / hidden / dashed / dotted / solid / double / groove / ridge;
border-radius: _length_;
border-collapse: collapse / adjacent;       /* for tables */
```

# Display
```css
display: inline / block / inline-block;     /* inline elements don't have any margin, padding, height or width applied */
```

# Box Model
```css
margin: top right bottom left;          /* can have negative values */
margin: (top bottom) (right left);
margin: 0 auto;                         /* center an element */
padding: top right bottom left;
padding: (top bottom) (right left);
box-sizing: content-box / border-box;
box-shadow: 5px 5px 5px blue;           /* box-shadow: <offset-x> <offset-y> <blur-radius> <color> */
overflow: visible / hidden / clip / scroll;
```

# Position
```css
position: static, relative, absolute, fixed, sticky;    /* absolute position requires its parent to be non-static */
/* if an absolute position child has a static parent, it will be positioned relative to window */
/* if an absolute position child has a relative parent, it will be positioned relative to parent */
top: _length_;
right: _length_;
bottom: _length_;
left: _length_;
z-index: _number_;
```

# CSS Layout Adjusting
CSS Grid is not a competitor to flexbox. They interoperate and collaborate on complex
layouts, because CSS Grid works on 2 dimensions (rows AND columns) while flexbox works
on a single dimension (rows OR columns).

# Tables
Do all the things you want, then apply `border-collapse: collapse;`

# Centering Horizontally
## Text
```css
text-align: center;
```
## Block Elements
```css
#flexboxway {
    display: flexbox;
    justify-content: center;
}
#oldway {
    margin: 0 auto;
    width: 50%;
}
```

# Centering Vertically
```css
#flexboxway {
    display: flex;
    align-items: center;
}
```

# Lists
```css
li {
    list-style-type: square / disc / circle / none;
    list-style-position: outside;                   /* add the marker outside (default) or inside of the list content, in the flow of the page */
}
```

# Media Features
We can use media features inside HTML documents:
```html
<link rel="stylesheet" media="(max-width: 500px)" href="./mobile.css">
```
## Media Types
Used in media queries and @import declarations.
* `all` means all the media types
* `print` used when printing
* `screen` used when the page is presented on the screen (default)
* `speech` used for screen readers

Media types can be sued in @import statements:
```css
@import url(file.css) screen;
@import url(other-file.css) screen, print;      /* load a CSS file on multiple media types */
@import url(other-other-file.css) not screen;   /* negate a media query */
```
## Media Feature Descriptions
Express conditionals. All the conditionals are:
* `width`, `height`, `device-width`, `device-height`, `aspect-ratio`, `color`, `color-index`, `resolution`, `orientation`, `scan`, `grid`.
Each of them have a corresponding `min-` `max-` value; as `min-width`, `max-height`.
Usage:
```css
@import url("file.css") screen and (max-width: 1000px) and (min-width: 700px);
```
## Media Queries
Used for responsive design.
```css
@media screen and (max-width: 800px) and (min-width: 600px) and (orientation: landscape) {
  /* some conditional CSS */
}
```
## Feature Queries
For checking if a browser supports CSS grid:
```css
@supports (display: grid) {
  /* apply this CSS */
}
```
We can also use the logical operators `and`, `or`, and `not` to build complex feature queries.

# Filters
* blur()
* brightness()
* contrast()
* drop-shadow()
* grayscale()
* hue-rotate()
* invert()
* opacity()
* sepia()
* saturate()
* url()
```css
img {
  filter: opacity(0.5) blur(2px);
}
```
It's like photoshop, a post-production.

# Transforms
## 2D Transforms
* translate() - move elements around
* rotate() - rotate elements
* scale() - scale elements in size
* skew() - twist or slant an element
* matrix() - a way to perform any of the above operations using a matrix of 6 elements, a less user-friendly syntax but less verbose
There are also axis-specific functions as `translateX()` and `scaleY()`.
```css
.box {
    transform: scale(2, 0.5) rotateY(20deg) translateY(100px);
    /* scale: duplicate width by 2, duplicate height by 0.5 */
}
```
+ `transform-origin` can be used to set the origin for the transformation.
## 3D Transforms
```css
.ThreeDeeElement {
    perspective: 100px;     /* specify how far the 3D object is */
}
```
Then we can use the functions
* translateZ()
* rotateZ()
* scaleZ()

# Transitions
Create animations. Usage: `transition: property duration timing-function delay;`
* Timing function can be one of the `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`.
Example:
```css
.circle {
    background: green;
    transition: background 1s ease-in;
}
.circle:hover {
    background: yellow;
}
```

# Animations
The animation properties can be used separately:
* animation-name
* animation-duration
* animation-timing-function
* animation-delay
* animation-iteration-count
* animation-direction
* animation-fill-mode
* animation-play-state
Shorthand usage: `animation: name duration timing-function delay iteration-count direction fill-mode play-state;`
+ Example:
```css
.item {
    animation: spin 10s linear infinite;
}
@keyframes spin {       /* you must define how your animation works using keyframes */
    0% {
        transform: rotateZ(0);
    }                   /* you can have as many intermediate waypoints as you want */
    100% {
        transform: rotateZ(360deg);
    }
}
```
