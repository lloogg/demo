#include <stdio.h>
#include <stdlib.h>
#include <string.h>
// 在原本申请好的堆区空间的基础上重新申请内存，如果原本申请好的空间的后面不足以增加指定的大小，系统会重新寻找一个足够大的位置开辟指定的空间，然后将原本空间中的数据拷贝过来，然后释放原本的空间

// 如果 newsize 比原先的内存小，则会释放原先内存的后面的存储空间，只留前面的newsize个字节
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

    p = (char *)realloc(p, 150);

    return 0;
}