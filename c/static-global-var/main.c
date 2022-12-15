#include <stdio.h>
// static 限制了静态全局变量的作用范围，只能在它定义的.c（源文件）中有效，不能跨文件使用。不赋初值，默认为 0
static int num;
static char c;
int main()
{
    printf("%d\n", num);
    printf("%c\n%d\n", c, c);
    return 0;
}