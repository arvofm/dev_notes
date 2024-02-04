This is an "all you need" note to CSS Flexbox.

# CSS Flexbox For Container
(i) Each is a property for container.
Enable flexbox:
```css
.container {
    display: flex / inline-flex;
}
```

## Align Direction
```css
.container {
    flex-direction: row / row-reverse / column / column-reverse;                        /* default is row */
    justify-content: flex-start / flex-end / center / space-between / space-around;     /* change horizontal alignment */
    align-items: flex-start / flex-end / center / baseline / stretch;                   /* change vertical alignment */
}
```

## Wrapping Items
By default, items in flexbox are kept on a single line, shrinking them to fit in the container.
To force the items to spread across multiple lines, use `flex-wrap: wrap`. Yet there is a shorthand
to combine `flex-direction` and `flex-wrap` properties.
```css
.container {
    flex-direction: row;
    flex-wrap: wrap;
    flex-flow: row wrap;        /* flex-direction flex-wrap */
}
```

# CSS Flexbox Properties For Items In Flexbox Container

## Order
Items are ordered based on an order they are assigned. By default, every item has order 0, and
the appearance in the HTML determines the final order.
You can override this property using `order` on each separate item. You can make an item appear
before all the others by setting a negative value.

## Vertical Alignment
An item can choose to override the container's `align-items` setting, by using `align-self` property,
which has the same 5 possible values of `align-items`.

## Relative Alignment
```css
.item1 {
    flex-grow: 1;        /* relatively align for all, takes 33% */
}
.item2 {
    flex-grow: 2;        /* relatively align for all, takes 66% */
}
```
