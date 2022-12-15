#include <stdio.h>
int main(int argc, char *argv[])
{
    int a = 10;
    int b = 4;
    float c = (float)a / b;
    int d = -0x01;
    int e = d >> 3;

    printf("%f\n", c);
    printf("%#d, %d\n", d, e);

    return 0;
}