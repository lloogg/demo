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
class Basement
{
};
// 多继承
class A : public Base, public Basement
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

int main()
{

    A a(1, 2, 3, 4);
}