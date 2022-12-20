#include <iostream>
using namespace std;
// 类模板不能自动类型推导

template <class T1, class T2>
class Animal {
    public:
        T1 age;
        T2 data;
        Animal(T1 age, T2 data) {
            this->age = age;
            this->data = data;
        }
};
int main()
{
        Animal<int, string> animal(10, "hello");
        cout << animal.age << endl;
}