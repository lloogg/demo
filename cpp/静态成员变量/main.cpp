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

    static int age; // 静态成员变量，在编译阶段就分配内存，不能在类内初始化，类内只能声明，存在静态全局区
};
int Person::age = 10;

void test1()
{
    Person p;
    p.age = 100;
}

void test2()
{
    cout << Person::age << endl;
    Person::age = 200;
}
int main()
{
    test1();
    test2();
    // 使用 malloc 和 free 去动态申请对象和释放对象，不会调用类的构造函数和析构函数
    Person *p = (Person *)malloc(sizeof(Person));
    free(p);
}