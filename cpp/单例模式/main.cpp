#include <iostream>
#include <string>
#include <cstring>
using namespace std;

class Person
{
private:
    static Person *p;
public:
    const static int age = 0xff; // const 修饰的静态成员变量保存在常量区，不可修改，可以在类内赋值
    static Person *getInstance()
    {
        if (p == nullptr)
        {
            p = new Person;
        }
        return p;
    }
    // 析构函数，销毁之前自动调用
    ~Person()
    {
        cout << "Person 析构函数" << endl;
    }
};
Person *Person::p = nullptr;

int main()
{
    Person *p1 = Person::getInstance();
    Person *p2 = Person::getInstance();
    printf("%p %p", p1, p2);
}