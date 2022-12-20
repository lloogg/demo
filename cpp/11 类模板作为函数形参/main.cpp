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
template <class T1, class T2>
void show(Animal<T1, T2> &animal) {
        cout << animal.age << " " << animal.data << endl;
}
int main()
{
        Animal<int, string> animal(10, "hello");
        cout << animal.age << endl;

        show<int, string>(animal);
}