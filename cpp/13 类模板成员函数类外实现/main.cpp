#include <iostream>
using namespace std;
// 类模板不能自动类型推导

template <class T1, class T2>
class Animal
{
public:
        T1 age;
        T2 data;
        Animal(T1 age, T2 data)
        {
                this->age = age;
                this->data = data;
        }
};

template <class T1, class T2>
class Cat : public Animal<T1, T2>
{
public:
        Cat(T1 age, T2 data);
};

template <class T1, class T2>
Cat<T1, T2>::Cat(T1 age, T2 data) : Animal<T1, T2>(age, data)
{
        cout << "Cat 构造函数" << endl;
}
int main()
{
        Animal<int, string> animal(10, "hello");
        cout << animal.age << endl;

        Cat cat("10", "0xff");
        cout << cat.data << endl;
}