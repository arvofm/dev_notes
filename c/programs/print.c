#include <stdio.h>

int main(int argc, char **argv) {
    while (--argc > 0)
        printf((argc > 1) ? "%s " : "%s", *++argv);
    putchar('\n');
    return 0;
}
