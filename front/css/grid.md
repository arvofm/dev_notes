This is an "all you need" note for CSS Grid.


# CSS Grid
Introduces a new unit called fraction, `fr`. A fraction is a unit of space equally distributed.
The CSS Grid layout is activated on a container element.
```css
display: grid;
```
The most basic container properties are *grid-template-columns* and *grid-template-rows*.
```css
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 2fr; /* |-|-|-|-|--| */      /* auto can also be used */
grid-template-rows: repeat(2, 20em);        /* |-|-|-|-|--| */
grid-column-gap: 25px;
grid-row-gap: 25px;
grid-gap: 25px;                 /* shorthand for grid-column-gap and grid-row-gap */
```


## Item Adjusting In Grids
To adjust the length of one cell item with respect to grid proportions:
* For columns, the numbers correspond to the vertical line that separates each column, starting from 1.
* The same applies for rows as horizontal.
```css
grid-column-start: _number_;
grid-column-end: _number_;
grid-row-start: _number_;
grid-row-end: _number_;
```
Here is an example:
```css
.item2 {                                /* |-|--|-| */
    grid-column-start: 2;               /* |-|-|--| */
    grid-column-end: 4;
}
.item6 {
    grid-column-start: 3;
    grid-column-end: 5;
}
```
The shorthand syntax is:
```css
grid-column: 2 / 4;     /* start / end */
grid-row: 3 / 5;
```


## Template Areas In Grids
Define template areas to move them around in the grid, or also spawn an item on multiple rows, instead of using `grid-column` or `grid-row`.
Suppose we have an HTML file like:
```html
<div class="container">
<header> ... </header>
<main> ... </main>
<aside> ... </aside>
<footer> ... </footer>
</div>
```
An example CSS file would be like:
```css
.container {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 200px 200px 200px 200px;
  grid-template-rows: 100px 450px 50px;
  grid-template-areas:
    ". header header ."                 /* . means empty cell */
    "sidebar main main main"
    "footer footer footer footer";
}
header {
  grid-area: header;
}
main {
  grid-area: main;
}
aside {
  grid-area: sidebar;
}
footer {
  grid-area: footer;
}
```


## An Example Of A Greater Start
Suppose we have an HTML file that includes
```html
<div class="container">
    <div class="item item-1"> 1 </div>
    <div class="item item-2"> 2 </div>
    <div class="item item-3"> 3 </div>
</div>
```
Let's see how we can alter the layout.
```css
.container {
    display: grid;
    grid-template-columns: repeat(6, 100px);
    grid-template-rows: repeat(3, 100px);
}
.item1 {
    grid-column: 1 / 3;         /* grid-column: grid-column-start / grid-column-end     */
    grid-row: 1 / 5;            /* grid-row: grid-row-start / grid-row-end              */
}
.item2 {
    grid-column: span 2;        /* take 2 cells of space                                */
    grid-row: span 4;           /* take 4 cells of space                                */
}
.item3 {
    grid-area: 1 / 5 / 2 / 7;   /* row-start / col-start / row-end / col-end            */
}
```
Here we have a layout like
1-2-3-4-5-6-7
|1|1|2|2|3|3|
2------------
|1|1|2|2|3|3|
3------------
|~|~|~|~|~|~|
4------------

* Items can be layered on top of each other.


## Implicit Grids
Suppose you have made a mistake aligning new items in grids. For example, all the cells are occupied by a number of grid items,
and then a new grid item has been added in the HTML file. For that situation, a new grid cell will be created as an implicit grid,
a new grid row will be created for that new grid item.
* An implicit grid item does not implement the values given in `grid-template-rows` and `grid-template-columns`.
To avoid possible uncertainties:
```css
.container {
    /* ... */
    grid-auto-flow: row;        /* any implicit grid that gets created will be layed out in a new row       */
    grid-auto-flow: column;     /* any implicit grid that gets created will be layed out in a new column    */
    grid-auto-rows: 100px;      /* any implicit grid that gets created will occupy 100px row                */
    grid-auto-columns: 100px;   /* any implicit grid that gets created will occupy 100px column             */
}
```


## Align & Justify
In default, grid items are stretched to both row axis and column axis. This is controlled by `justify-items` and `align-items`,
having a default value of `stretch`.
```css
.container {
    /* ... */
    justify-items: stretch;   /* start / end / baseline / center / stretch        */
    align-items: stretch;   /* start / end / baseline / center / stretch          */
}
.item1 {
    justify-self: stretch;    /* overwrite the justify-items property for this specific grid item         */
    align-self: stretch;      /* overwrite the align-items property for this specific grid item           */
}
```
To change the layout of all the content:
```css
    justify-content: start;     /* start / end / center / baseline / space-between / space-around / space-evenly    */
    align-content: start;       /* start / end / center / baseline / space-between / space-around / space-evenly    */
```


## Just A Cool Trick
Automatically auto-fit all the grid items to the column; when the items reach their minimum size of 100px,
the auto-fit keyword will update the item alignment for the last item to go on to the next row, wrapping.
Create a grid that is automatically responsive:
```css
.container {
    display: grid;
    grid-template-rows: repeat(4, 100px);
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
```

