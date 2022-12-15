#include <stdio.h>
#include <string.h>
// strlen 返回字符串长度，但不包括 '\0'
int main()
{
    char c1[] = {'a', 'b', 'c', 'd', 'e'};
    char c2[] = "abcde";
    char c3[100] = "abc\0de";
    printf("%d\n", strlen(c1));
    printf("%d\n", strlen(c2));
    printf("%d\n", strlen(c3));
    printf("%d\n", sizeof(c3) / sizeof(char));
    return 0;
}