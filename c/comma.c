#include <stdio.h>
int a() {
    printf("a");
    return 1;
}

int b() {
    printf("b");
    return 2;
}

int c() {
    printf("c");
    return 3;
}
int main(int argc, char* argv[]) {
    // 逗号运算符，分别执行a函数，b函数，c函数，返回值为最后一个返回值
    int res = (a(), b(), c());
    printf("%d\n", res);
    return 0;
}
