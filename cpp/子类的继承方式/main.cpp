#include <iostream>
#include <string>
#include <cstring>
using namespace std;
class Base
{

public:
    int a;
    Base()
    {
    }
    Base(int a, int b, int c)
    {
        cout << "基类构造" << endl;
        this->a = a;
        this->b = b;
        this->c = c;
    }
    ~Base()
    {
        cout << "基类析构" << endl;
    }

protected:
    int b;

private:
    int c;
};
// 公有的继承
// 基类中是什么控制权限，子类就是什么控制权限
class A : public Base
{
public:
    A(int a, int b, int c, int d) : Base(a, b, c)
    {
        cout << "A类构造" << endl;
        this->d = d;
    }
    ~A()
    {
        cout << "A类析构" << endl;
    }
    int d;
};
// 保护继承会把基类的公有属性变成 protected
class B : protected Base
{
};
// 私有继承，全部变私有
class C : private Base
{
};

class D : public C
{
};
int main()
{
    cout << "sizeof(A) = " << sizeof(A) << endl;
    cout << "sizeof(B) = " << sizeof(B) << endl;
    cout << "sizeof(C) = " << sizeof(C) << endl;
    B *b = new B();
    D *d = new D();
    A a(1, 2, 3, 4);
}