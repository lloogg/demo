#include <stdio.h>
char *func()
{
    // warning: function returns address of local variable
    // 栈区开辟的空间会随着当前代码段的结束而释放空间
    char str[100] = "hello world";
    return str;
}

char *func()
{
    // 静态区的空间不会随着当前代码段的结束而释放
    static char str[100] = "hello world";
    return str;
}
int main()
{
    char *p;
    p = func();
    printf("%s\n", p);
}