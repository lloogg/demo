#include <iostream>
using namespace std;
// 引用定义时必须初始化
// 不能有 NULL 引用
int a = 100;
void test1() {
    int a = 10;
    int &b = a;
    b = 100;
    cout << a << endl;
}

void test2() {
    int a[5] = {1,2,3,4,5};
    int (&arr)[5] = a;

    for (int i = 0; i < 5;i++) {
        cout << arr[i] << endl;
    }
}
int main() {
    test1();
    test2();
    return EXIT_SUCCESS;
}