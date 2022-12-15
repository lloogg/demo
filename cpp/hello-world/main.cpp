#include <iostream>
using namespace std;
int a = 100;
int main() {
    cout << "hello" << endl;
    int a = 10;
    cout << a << endl;
    // 打印全局作用域下的 a
    cout << ::a << endl;
    return EXIT_SUCCESS;
}