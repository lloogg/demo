#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char *func()
{
    // 静态全局区的空间只要开辟好，除非程序结束，否则不会释放
    // 如果是临时使用，不建议使用静态全局区的空间
    static char ch[100] = "hello world";
    return ch;
}

char *func()
{
    // 使用 malloc 的时候一般要强转
    char *str = (char *)malloc(100 * sizeof(char));
    str[0] = 'h';
    str[1] = 'h';
    str[2] = 'h';
    str[3] = 'h';
    memset(str + 3, 65, 2);
    return str;
}
int main()
{
    char *p = func();
    printf("%s\n", p);

    free(p);
    // 为了防止野指针
    p = NULL;

    return 0;
}