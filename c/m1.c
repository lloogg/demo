#include <stdio.h>
int main(int argc, char* argv[]) {
    char a = 'a';
    short b = 1;
    int c;
    long d;
    float e;
    double f;

    long long g;
    printf("%d\n", sizeof(a));
    printf("%d\n", sizeof(b));
    printf("%d\n", sizeof(c));
    printf("%d\n", sizeof(d));
    printf("%d\n", sizeof(e));
    printf("%d\n", sizeof(f));
    printf("%d\n", sizeof(g));
    return 0;
}