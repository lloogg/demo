#include <iostream>
#include <string>
#include <cstring>
using namespace std;

class Person
{
public:
    // explicit 表示不能隐式调用构造函数
    explicit Person(int p_age) : age(p_age)
    {
        cout << "Person 构造函数" << endl;
    }
    // 析构函数，销毁之前自动调用
    ~Person()
    {
        cout << "Person 析构函数" << endl;
    }

    int age;
};
int main()
{
    // 使用 malloc 和 free 去动态申请对象和释放对象，不会调用类的构造函数和析构函数
    Person *p = (Person *)malloc(sizeof(Person));
    free(p);
}