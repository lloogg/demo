#include <iostream>
#include <string>
#include <cstring>
using namespace std;
/**
 * @brief 由纯虚函数的类为抽象类，抽象类不能实例化
 *
 */
class Animal
{

public:
    int a;
    Animal()
    {
    }
    virtual void speak() // 虚函数
    {
        cout << "动物在说话" << endl;
    }
    /**
     * @brief 将虚函数 = 0，实质是将虚函数表的函数入口地址置为 NULL
     *
     */
    virtual void foo() = 0; // 纯虚函数
    virtual ~Animal() = 0;  // 纯虚析构

protected:
    int b;

private:
    int c;
};

/**
 * @brief 如果子类继承了抽象类，但没有重写纯虚函数，子类也是一个抽象类。
 *
 */
class Dog : public Animal
{
public:
    void speak()
    {
        cout << "狗在说话" << endl;
    }
    void foo() {}
    ~Dog()
    {
        cout << "Dog类析构" << endl;
    }
    int d;
};
// 静态绑定
void test1(Animal *animal)
{
    animal->speak(); // 地址早绑定 -> 加上 virtual 地址晚绑定
    // 由编译时多态变为运行时多态
}
int main()
{
    Animal *dog = new Dog;
    delete dog; // 打印 Animal类析构
}