#include <iostream>
using namespace std;
// 类模板不能自动类型推导

#include "animal.hpp"
int main()
{
        Animal<int, string> animal(10, "hello");
        cout << animal.age << endl;

        Cat cat("10", "0xff");
        cout << cat.data << endl;
}