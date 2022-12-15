#include <stdio.h>
#include "include/func.h"
void f2();

int main()
{
    f1();
    return 0;
}
void f1()
{
    f2();
}
void f2()
{
}