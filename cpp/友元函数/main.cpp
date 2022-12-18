#include <iostream>
#include <string>
#include <cstring>
using namespace std;
/**
 * 友元函数是一种特权函数，可以访问类中的私有成员
 *
 */

class Person
{
    friend void accessPrivateMember(Person *p);

private:
    static Person *p; // 存在静态全局区
    int a = 20;

public:
    const static int age = 0xff; // const 修饰的静态成员变量保存在常量区
    // 函数存在代码区
    void print()
    {
        cout << a << endl;
    }

    // 析构函数，销毁之前自动调用
    ~Person()
    {
        cout << "Person 析构函数" << endl;
    }
};
void accessPrivateMember(Person *p)
{
    cout << p->a << endl;
}
int main()
{
    Person *p = new Person;
    accessPrivateMember(p);
}