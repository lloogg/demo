#include <stdio.h>
#include <string.h>
// strcpy 也会复制 '\0'
// strncpy 不拷贝 '\0'
// strncpy 如果 n 大于src指向的字符串中的字符个数，则在dest后面填充n-strlen(src)个'\0'
int main()
{
    char s1[32] = "hello world";
    char s2[32] = "abcdefg";
    strcpy(s1, s2);
    printf("%s\n", s1);
    for (int i = 0; i < 32; i++)
    {
        printf("%c %d\n", s1[i], s1[i]);
    }
    return 0;
}