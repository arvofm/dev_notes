# Some Little Stuff I May Forget Sometime

### Determining whether two arrays a and b have an element in common & goto

```c
char haveCommon(int a[], int sa, int b[], int sb) {
    for (int i = 0; i < sa; i++)
        for (int j = 0; j < sb; j++)
            if (a[i] == b[j]) goto found; /* goto breaks through all loops and goes to that label */
    return 0;
found:
    return 1;
}
```
-------------------------------------------------------------------------------------------

### About 'extern'

* If an external variable is to be referred before it is defined, or if it is
defined in a different source file from the one where it is being used, then an extern
declaration is mandatory.

-------------------------------------------------------------------------------------------

### About 'static'

** In C, the static keyword can be used in several different ways depending on its context. Here are some common uses of static in C: **

*   static variable inside a function: A static variable inside a function keeps its value between function calls,
    but its scope is limited to the function where it's declared.

*   static variable outside a function: A static variable declared outside a function has internal linkage, meaning
    it's only visible within the file where it's declared.

*   static function: A static function has internal linkage, meaning it's only visible within the file where it's declared.

** In C++, the static keyword has similar uses, but it also has some additional features: **

*   static class member variable: A static class member variable is shared by all instances of the class, and
    its value persists across instances. It can be accessed without an instance of the class.

*   static class member function: A static class member function can be called without an instance of the
    class, and it can only access static class member variables.

-------------------------------------------------------------------------------------------

### Pointers

* ++*px;      (*px)++;      unary operators like * and ++ associate right to left

* int a[]; int *pa;     pa = &a[0]; is equal to pa = a; samely,
  a[i] can also be written as *(a+i), so &a[i] = a+i
  pointer arithmetic is consistent, whether a is char or an int, *(a+1) is a[1] */

* A pointer is a variable, so pa=a; and pa++ are legal.
  But an array name is not a variable, so a=pa; and a++; are illegal.

-------------------------------------------------------------------------------------------

### Command-line arguments

* For command line argumentation, argc is the number of arguments, argv[i] is the commands vector 
  argv[0] is the name by which the program was invoked, so argc is at least 1. If argc is 1,
  there are no command-line arguments after the program name.

* The first optional argument is argv[1] and the last is argv[argc-1]; additionally,
  the standard requires that argv[argc] be a null pointer.

-------------------------------------------------------------------------------------------

### Pointers of functions

* Function pointers are just a way to assign functions to variables. For func() is a function:
```c
void (*fnc)();
fnc = justDoSomething; /* implicit conversion from &justDoSomething */
typedef void(*function)();
function justDoSomething;
fnc();
function();
```
* Thus, a function can require a function pointer as a parameter.

-------------------------------------------------------------------------------------------

### Complicated Declarations
```c
int *f();       /* function returning pointer to int */
int (*f)();     /* pointer to function returning int */
```
* Rest is unbelievably complicated

-------------------------------------------------------------------------------------------

### Structs
```c
struct point *pp;   /* then to reach the members of struct point: */
int x = (*pp).x;    /* parentheses are necessary, because the precedence of . is higher than * */
int x = *pp.x;      /* *(pp.x) illegal operation: x is not a pointer */
int x = pp->x;      /* refers to the particular member */

/* both . and -> associate from left to right, then these are equivalent: */
r.pt.x  (r.pt).x  rp->pt.x  (rp->pt).x

++p->len;           /* increments p, not len: ++(p->len) */
```
* It is illegal for a struct to contain an instance of itself, but a pointer to itself is okay.

-------------------------------------------------------------------------------------------

### Unions
Unions can occupy the memory of one member at a time.
Useful when you want to give two different names to the same variable. This feature is extendible:
```c
struct Vec2 {
    float x, y;
};
struct Vec4 {
    union {
        struct {
            float x,y,z,w;
        };
        struct {
            struct Vec2 a, b;
        };
    };
};
```
Here a:(x,y), and b:(z,w). So Vec4.b.x would give Vec4.z

-------------------------------------------------------------------------------------------

### Bit Fields
Tell the compiler how much bit the variable in a struct has to occupy. For example [0-31] leads to 5 bits.
But the real occupation will be according to the memory management rules.
For detailed explanation, see [CppNuts' video](https://youtu.be/S30RAtj-0dQ).

(i) Always use unsigned type to tell the compiler min memory need is that much, of course it's unsigned.
```c
struct Date {
    unsigned int date: 5;   // max: 31,     [00000-11111]
    unsigned int month: 4;  // max: 12,     [0000-1111]
    unsigned int year;
};
struct node1 {
    unsigned int a: 6;
    unsigned int a: 9;
};
struct node2 {
    unsigned int a: 6;
    unsigned int: 0;        // like \hfill
    unsigned int b: 9;
};
```
Here we have sizeof: Date-8, node1-4, node2-8
* You cannot take the address of bit fields, no pointer manipulation applied.
* You cannot have arrays of bit fields.

-------------------------------------------------------------------------------------------

### Misc

* A 'sizeof' can not be used in a #if line, because the preprocessor does not parse type names.
  But #define is not evaluated by the preprocessor.
