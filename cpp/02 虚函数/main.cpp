#include <iostream>
#include <string>
#include <cstring>
using namespace std;
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
    ~Animal()
    {
        cout << "Animal类析构" << endl;
    }

protected:
    int b;

private:
    int c;
};

class Dog : public Animal
{
public:
    void speak()
    {
        cout << "狗在说话" << endl;
    }
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
    Animal animal;
    test1(&animal); // 打印 动物在说话
    Dog dog;
    test1(&dog); // 打印 狗在说话
}