#include <iostream>
#include <string>
#include <cstring>
using namespace std;
// 我们经常使用一个对象忘记释放，所以我们用智能指针
// 实质是一个局部对象，这个局部对象维护了 new 出来的对象的地址
// 重载了 -> 和 * 操作符
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
};
class SmartPointer
{
public:
    Person *p;
    SmartPointer(Person *p)
    {
        this->p = p;
    }

    Person *operator->()
    {
        return this->p;
    }

    Person operator*()
    {
        return *(this->p);
    }

    ~SmartPointer()
    {
        delete this->p;
        cout << "SmartPointer 析构函数" << endl;
    }
};
void test1()
{
    Person *p = new Person();
    // 栈上创建的对象，在生存期结束的时候自动释放
    SmartPointer sp(p);
    cout << sp->age << endl;
    cout << (*sp).age << endl;
}
int main()
{
    test1();
}