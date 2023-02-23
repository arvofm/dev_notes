#include <stdio.h>
#include "generalLib.h"

/* read a line into s, return length, but better */
int getLineBetter(char *s, int lim) {
    char *c = s;
    while ((c-s)<(lim-1) && (*c = getchar()) != EOF && *c++ != '\n');
    *c = '\0';
    return c-s;
}

/* string comparison: return <0 if s<t, 0 if s=t, >0 if s>t */
int strCmp(const char *s1, const char *s2) {
    for (; *s1 == *s2; s1++, s2++)
        if (!*s1)
            return 0;
    return *s1 - *s2;
}

/* returns the length of the string */
int strLen(char *s) {
    char *p;
    for (p=s; *p; p++);
    return p - s;
}

/* return index of t in s, -1 if none */
int strindex(char s[], char t[]) {
    /* The standard library provides a function strstr() that is 
     * similar to strindex, except that it returns a pointer instead of an index. */
    int i, j, k;
    for (i = 0; s[i]; i++) {
        for (j=i, k=0; t[k] && s[j] == t[k]; j++, k++);
        if (k > 0 && !t[k])
            return i;
    }
    return -1;
}

// shellsort: sort v[] into increasing order
void shellSort(int arr[], int n) {
    int gap, i, j, temp;
    for (gap = n/2; gap > 0; gap /= 2)
        for (i = gap; i < n; i++) {
            temp = arr[i];
            for (j = i; j >= gap && arr[j-gap] > temp; j -= gap) {
                arr[j] = arr[j-gap];
            }
            arr[j] = temp;
        }
}

// binsearch:  find x in v[0] <= v[1] <= ... <= v[n-1]
int binsearch(int x, int v[], int n) {
    int low, mid, high;
    low = 0;
    high = n - 1;
    while (low <= high) {
        mid = (low + high) / 2;
        if (x < v[mid])
            high = mid + 1;
        else if (x > v[mid])
            low = mid - 1;
        else
            return mid;;
    }
    return -1;
}

// read a line into s, return length
int getLine(char s[], int lim) {
    int c, i;
    for (i=0; i < lim-1 && (c = getchar()) != EOF && c!='\n'; i++)
        s[i] = c;
    if (c == '\n')
        s[i++] = c;
    s[i] = '\0';
    return i;
}

// copy 'from' into 'to', assume to is big enough
void copy(char from[], char to[]) {
    for (int i=0; (to[i] = from[i]) != '\0'; i++);
}

// print a histogram of input, type: 0-default, 1-vertical, 2-horizontal
void printHistogram(const int type) {
    int c;
    int h[26];
    for (int i = 0; i < 26; i++)
        h[i] = 0;
    while ((c = getchar()) != EOF) {
        if (c >= 'a' && c <= 'z')
            h[c-'a']++;
        else if (c >= 'A' && c <= 'Z')
            h[c-'A']++;
    }
    if (type == 0) /* write as numbers */
        for (int i = 0; i < 26; i++)
            printf("%c: %d\n", i+'a', h[i]);
    else if (type == 1) /* write as characters: vertical */
        for (int i = 0; i < 26; i++) {
            printf("%c: ", i+'a');
            for (int j = 0; j < h[i]; j++)
                putchar('-');
            putchar('\n');
        }
    else if (type == 2) { /* write as characters: horizontal */
        int max = 0;
        for (int i = 0; i < 26; i++)
            if (h[i] > max) max = h[i];
        for (int l = 0; l < max; l++) {
            for (int i = 0; i < 26; i++) {
                putchar(' ');
                if ((h[i] - max + l)>-1)
                    putchar('O');
                else
                    putchar(' ');
                putchar(' ');
            }
            putchar('\n');
        }
        for (int i = 0; i < 26; i++)
            printf(" %c ", i+'a');
        putchar('\n');
    }
}

// output one word per line where input is taken
void wordPerLine() {
    int state, c;
    state = OUT;
    while ((c = getchar()) != EOF) {
        if (c == ' ' || c == '\n' || c == '\t') {
            state = OUT;
            putchar('\n');
        }
        else if (state == OUT)
            state = IN;
        if (state == IN)
            putchar(c);
    }
}

// count characters where input is taken
int countChars(){
    int i;
    for (i=0; getchar() != EOF; i++);
    return i;
}

// count lines where input is taken
int countLines() {
    int l, c;
    for (l=0; (c=getchar()) != EOF; l += (c=='\n'));
    return l;
}

// count words where input is taken for a line
int countWordsInALine() {
    int b, c;
    for (b=0; (c=getchar()) != EOF; b += (c==' '));
    return b+1;
}

