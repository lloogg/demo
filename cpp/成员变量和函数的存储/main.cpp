#include <iostream>
#include <string>
#include <cstring>
using namespace std;

class Person
{
private:
    static Person *p; // 存在静态全局区
    int a;

public:
    const static int age = 0xff; // const 修饰的静态成员变量保存在常量区
    // 函数存在代码区
    void print()
    {
        cout << a << endl;
    }
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
    cout << sizeof(Person) << endl;
}