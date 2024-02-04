# Bootstrap 5 Notes

To include bootstrap CSS, add these lines to where they are necessary:
```html
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" 
    integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
```

(i) For Bootstrap, default `box-sizing` value is `border-box`.


## Grid System and Container

Start with containers, place the rest inside.
`.container` is responsive, and there are other alternatives which are relatively responsive.
```html
<div class="container"> 
  <!-- .contianer is the same as .container-sm -->
</div>
```
Other containers are: `.container-sm .container-md .container-lg .container-xl .container-xxl .container-fluid`
* Bootstrap’s grid system uses a series of containers, rows, and columns to layout and align content.
```html
<div class="container text-center">
  <div class="row">
    <div class="col-sm-3"> Column </div>
    <div class="col-6"> Column </div>
    <div class="col"> Column </div>
  </div>
</div>
```
* Rows are divided into 12 cols. The above example will have a look like |-|--|-|
* Same as containers, `.col- 	.col-sm- 	.col-md- 	.col-lg- 	.col-xl- 	.col-xxl-`. Additional: `col-md-auto`
- For rows, `.row-cols-*` class adjusts the maximum horizontal stacking of cols, then adds the rest to next vertical space.
This can be used as
```html
<div class="container text-center">
  <div class="row row-cols-1 row-cols-sm-auto row-cols-md-4">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div>
```
(i) `.row` classes can be nested.


## Columns

* If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new line.

### Vertical Alignment
Change the vertical alignment of cols by adding the row item the class of `align-items-*`, where `*: start / end / center`.
```html
  <div class="row align-items-start"> ... </div>
```
* The alignment of each column can be altered individually with any of the responsive `align-self-*` classes. Apply to cols.

### Horizontal Alignment
Change the horizontal alignment with any of the responsive `justify-content-*` classes,
where `*: start / end / center / around / between / evenly`.

### Column Break
```html
<div class="container text-center">
  <div class="row">
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>

    <!-- Force next columns to break to new line -->
    <div class="w-100"></div>

    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
  </div>
</div>
```

### Offsetting Columns
Move columns to the right using `.offset-md-*` classes. These classes increase the left margin of a column by `*` columns.
For example, `.offset-md-4` moves `.col-md-4` over four columns.
```html
<div class="container text-center">
  <div class="row">
    <div class="col-md-4">.col-md-4</div>
    <div class="col-md-4 offset-md-4">.col-md-4 .offset-md-4</div>
  </div>
</div>
```


## Gutters
They are the gaps between column content, created by horizontal padding.
Syntax: `.gx-*` for horizontal gutters, `.gy-*` for vertical gutters, `.g-*` for both.
```html
<div class="container overflow-hidden text-center">
  <div class="row gx-5"> ... </div>
</div>
```


## Background

### Colors
* `.bg-danger` - red
* `.bg-success`- green
* `.bg-warning` - yellow
* `.bg-info` - aqua
* `.bg-light` - white
* `.bg-dark` - black
* `.bg-primary` - blue
* `.bg-secondary` - gray


## Margin & Padding
(i) `x` is `r` and `l`, and `y` is `t` and `b`.
To place margin to the item: `.m*-*`, where first `*` is `r`, `l`, `x`, `t`, `b`, `y`; and second `*` is a number.
* Every 1 increment is .25 rem.
- Same thins apply when working with paddings, the syntax is `.p*-*`
```html
<div class="px-auto"> ... </div>
```


## Alerts
Just gives alert-like messages. The syntax is as `.alert.alert-*`.
```html
<div class="alert alert-danger"> Logged in successfuly. </div>
```


## Buttons
The syntax is as `.btn.btn-*`.
```html
<a class="btn btn-primary"> Submit </a>
```
(i) `.btn-block` makes the button item `display: block`, taking all horizontal space of the page.


## Tables
Add the top table tag `.table` class. Then you can add other variants: `.table-*`, where `*` is some primary, danger...
* Table variants can be used on table, row, or individual cell items.

### Accented Tables
In practice, these are applied as `table.table.table-dark`
* Striped rows: `.table-striped`
* Striped columns: `.table-striped-columns`
* Dark table: `.table-dark`
* Greenish table: `.table-success`
* Hover-able rows: `.table-hover`
* Bordered table: `.table-bordered`     // Border color: `.border-primary`
* Borderless table: `.table-borderless`
* Small (compact) table: `.table-sm`


## Cards
```html
<div class="card" style="width: 18rem;">
    <div class="card-header">
        <img src="..." class="card-img-top" alt="...">
    </div>
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-footer">
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
```


## Lists
For table-like lists:
```html
<ul class="list-group">
    <li class="list-group-item"> 1 </li>
    <li class="list-group-item"> 2 </li>
    <li class="list-group-item"> 3 </li>
</ul>
```
* For horizontal lists: `ul.list-group-horizontal`
* For active-looking list items: `li.active`
* For disabled-looking list items: `li.disabled`
* For hover-able list items: `li.list-group-item-action`
* To remove some borders and rounded corners: `ul.list-group-flush`
* Numbered lists: `ol.list-group.list-group-numbered`
* Accented list items: `li.list-group-item-*`, where `*` is primary, secondary, danger...


## Forms
Visit [Bootstrap docs](https://getbootstrap.com/docs/5.3/forms/form-control/).


## Checkboxes & Radios
Visit [Bootstrap docs](https://getbootstrap.com/docs/5.3/components/list-group/#checkboxes-and-radios).


## Navigation
```html
<ul class="nav border-bottom justify-content-end">
    <li class="nav-item">
        <a class="nav-link" href="#"> Home </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#"> About </a>
    </li>
</ul>
```
(i) For dropdown menu, search further on [Bootstrap docs](https://getbootstrap.com/docs/5.3/components/navbar/).
