#include <iostream>
#include <string>
using namespace std;
// 类的默认成员是私有的，权限有 public、protected、private
class Person
{
public:
    // 拷贝构造大概长这样
    Person(Person const &p)
    {
        age = p.age;
        name = p.name;
    }
    Person(int p_age, string p_name)
    {
        age = p_age;
        name = p_name;
    }
    // 析构函数，销毁之前自动调用
    ~Person()
    {
        cout << "析构函数" << endl;
    }

    int age;
    string name;
    void printName()
    {
        cout << name << endl;
    }
};
int main()
{
    Person person(10, "小明");
    // 调用系统提供的默认拷贝构造
    Person person2(person);

    person.printName();
}