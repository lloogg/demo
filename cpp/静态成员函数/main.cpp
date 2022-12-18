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

    static void print() {
        cout << age << endl;
    }
};
int Person::age = 10;


int main()
{
    Person::print();
    Person *p1 = new Person;
    p1->print();
}