function *fibonacci() {
    let x = 0, y = 1;
    while (1) {
        yield y;
        [x, y] = [y, x+y];
    }
}
function *take(n, iterable) {       /* yield the first n elements of the given iterable */
    let it = iterable[Symbol.iterator]();
    while (n-- > 0) {               /* loop n times */
        let next = it.next();       /* get the next item from the iterator */
        if (next.done) return;      /* if there are no more values, return */
        else yield next.value;      /* otherwise, yield the value */
    }
}

