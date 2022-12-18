#include <iostream>
#include <string>
#include <cstring>
using namespace std;
void test1()
{
    int *p = new int; // 申请一块内存，sizeof(int)大小，并且对这块内存初始化
    cout << *p << endl;
    *p = 100;
    cout << *p << endl;
    delete p; // 释放申请的空间
}

void test2()
{
    int *p = new int[10]; // new 一个数组时，返回的是数组首元素的地址，即 int * 类型
    for (int i = 0; i < 10; i++)
    {
        p[i] = 2 * i + 1;
    }

    for (int i = 0; i < 10; i++)
    {
        cout << p[i] << " ";
    }
    cout << endl;

    delete[] p; // 释放申请的空间
}
class Person
{
public:
    Person()
    {
        cout << "Person 构造函数" << endl;
    }
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
    test1();
    test2();
    // 使用 malloc 和 free 去动态申请对象和释放对象，不会调用类的构造函数和析构函数
    Person *p = (Person *)malloc(sizeof(Person));
    free(p);

    Person *p2 = new Person;
    p2->age = 1200;
    cout << p2->age << endl;
    free(p2);
    // 调用对象的有参构造
    Person *p3 = new Person(10);
    delete p3;
    cout << "---------------" << endl;
    // new 对象的数组时，只能调用对象的无参构造
    // 返回数组首元素地址，即 Person *类型
    Person *p4 = new Person[10];
    delete[] p4;

    void *p5 = new Person;
    // warning delete void *不会调用析构函数
    delete p5;
}