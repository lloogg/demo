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
    explicit Person(int p_age, string p_name)
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
    // 匿名对象，生命周期在当前行
    Person(10, "anon");
    Person p1(10, "anon");
    // Person(p1); // 定义匿名对象不能使用拷贝构造

    // 显示调用构造函数
    Person p2 = Person(10, "小明");
    Person p3 = Person(p2);   // 赋值匿名对象可以使用拷贝构造
    // Person p4 = {10, "小明"}; // 隐式构造，不太使用，构造函数前加 explicit 可以禁止隐式构造
}