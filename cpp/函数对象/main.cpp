#include <iostream>
#include <string>
#include <cstring>
using namespace std;
// 一个重载了()的类，这个类定义出来的对象可以像函数一样使用，本质是调用了operator()这个函数
class Person
{

private:
    static Person *p; // 存在静态全局区
    int something = 20;

public:
    const static int age = 0xff; // const 修饰的静态成员变量保存在常量区
    // 函数存在代码区
    void print()
    {
        cout << this->something << endl;
    }

    // 析构函数，销毁之前自动调用
    ~Person()
    {
        cout << "Person 析构函数" << endl;
    }

    int operator()(int x, int y)
    {
        return x + y;
    }
};

int main()
{
    Person p;
    cout << p(3, 5) << endl;
}