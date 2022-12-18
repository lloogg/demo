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

    const static int age = 0xff; // const 修饰的静态成员变量保存在常量区，不可修改，可以在类内赋值
};

int main()
{

    // 使用 malloc 和 free 去动态申请对象和释放对象，不会调用类的构造函数和析构函数
    Person *p = (Person *)malloc(sizeof(Person));
    cout << p->age << endl;
    free(p);
    cout << Person::age << endl;
}