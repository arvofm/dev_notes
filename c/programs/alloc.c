/*
 *      A weird C file, I know...
 * */

#define ALLOCSIZE 10000 /* 10 kb */

static char allocbuf[ALLOCSIZE];
static char *allocptr = allocbuf;

char *alloc(int n) {
    if (allocbuf + ALLOCSIZE - allocptr >= n) {
        allocptr += n;
        return allocptr-n;
    }
    else 
        return 0;
}

void afree(char *p) {
    if (p >= allocbuf && p < allocbuf + ALLOCSIZE)
        allocptr = p;
}

