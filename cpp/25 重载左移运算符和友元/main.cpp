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

    friend ostream &operator<<(ostream &cout, Person *&p);

private:
    int something = 20;

public:
    const static int age = 0xff; // const 修饰的静态成员变量保存在常量区
    // 函数存在代码区
    Person(int something)
    {
        this->something = something;
    }
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

ostream &operator<<(ostream &cout, Person *&p)
{
    cout << p->something;
    return cout;
}

int main()
{
    Person *p = new Person(20);
    cout << p << endl;
}