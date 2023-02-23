#include "stdio.h"

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

void printVec2(const struct Vec2 *);

int main(int argc, char **arg) {
    /* A vec4 can be expressed as two vec2s */
    struct Vec4 vec = {1.0f, 2.0f, 3.0f, 4.0f};
    printVec2(&vec.a);
    printVec2(&vec.b);
    vec.z = 400.0f;
    printVec2(&vec.a);
    printVec2(&vec.b);

}

void printVec2(const struct Vec2 *vec) {
    printf("Vec: (%.1f, %.1f)\n", vec->x, vec->y);
}
