#include <iostream>
#include <string>
#include <cstring>
using namespace std;


class Person
{
public:
    // explicit 表示不能隐式调用构造函数
    explicit Person(int age)
    {
        this->age = age;
        cout << "Person 构造函数" << endl;
    }
    // 析构函数，销毁之前自动调用
    ~Person()
    {
        // if (name != NULL)
        // {
        //     free(name);
        //     name = NULL;
        // }
        cout << "Person 析构函数" << endl;
    }
    void show()
    {
        cout << this->age << endl;
    }
    int age;
};
int main()
{
    Person p1(120);
    p1.show();
}