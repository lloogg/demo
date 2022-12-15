#include <stdio.h>
#include <stdlib.h>
#include <string.h>
/**
 * @brief 每次调用 fun 都会泄露 100 个字节
 * 
 */
void fun() {
    char *p = (char *)malloc(100);
    /**
     * free(p); 解决方式1
     * p = NULL 防止野指针
     */
    // return p; 解决方式2
}
int main()
{
    char *p = (char *)malloc(100);
    // 上面开辟的内存找不到了
    p = "hello world";
    return 0;
}