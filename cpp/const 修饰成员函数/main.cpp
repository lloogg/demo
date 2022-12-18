#include <iostream>
#include <string>
#include <cstring>
using namespace std;

class Person
{
public:
    // 析构函数，销毁之前自动调用
    ~Person()
    {
        cout << "Person 析构函数" << endl;
    }
    // const 修饰的函数， 常函数，不能对成员变量进行修改
    // 不能通过 this 指针修改 this 指针指向的内容
    void change() const
    {
        this->age = 100;
    }
    int age;
};

int main()
{

    // 使用 malloc 和 free 去动态申请对象和释放对象，不会调用类的构造函数和析构函数
    Person *p = (Person *)malloc(sizeof(Person));
    p->change();
    free(p);
}