#ifndef GENERAL_LIB_ARVO
#define GENERAL_LIB_ARVO

#define IN 1
#define OUT 2
#define MAXLINE 1000

/* read a line into s, return length, but better */
int getLineBetter(char *s, int lim);
/* string comparison: return <0 if s<t, 0 if s=t, >0 if s>t */
int strCmp(const char *s1, const char *s2);
// return length of s
int strLen(char *s);
// return index of t in s, -1 if none
int strindex(char s[], char t[]);
// shellsort: sort v into increasing order
void shellsort(int v[], int n);
// binsearch:  find x in v[0] <= v[1] <= ... <= v[n-1]
int binsearch(int x, int v[], int n);
// read a line into s, return length
int getLine(char s[], int lim);
// copy 'from' into 'to', assume to is big enough
void copy(char from[], char to[]);
// print a histogram of input, type: 0-default, 1-vertical, 2-horizontal
void printHistogram(const int type);
// output one word per line where input is taken
void wordPerLine();
// count characters where input is taken
int countChars();
// count lines where input is taken
int countLines();
// count words where input is taken for a line
int countWordsInALine();

#endif
