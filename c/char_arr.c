#include <stdio.h>
int main()
{
    char c1[] = {'a', 'b', 'c', 'd', 'e'};
    char c2[] = "abcde";
    printf("%d\n", sizeof(c1) / sizeof(char)); // 5
    printf("%d\n", sizeof(c2) / sizeof(char)); // 6
    // 通过赋值""的方式，可以清除字符数组中的垃圾字符，让每一个元素都是"\0"
    char c3[32] = "";
    printf("%d\n", sizeof(c3) / sizeof(char)); // 32
    scanf("%s", c3);

    printf("%s\n", c3);
    printf("%d\n", sizeof(c3) / sizeof(char)); // 32
    return 0;
}