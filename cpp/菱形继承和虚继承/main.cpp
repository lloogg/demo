#include <iostream>
#include <string>
#include <cstring>
using namespace std;

class Animal
{
public:
    int age;
};
// 虚继承
class Sheep : virtual public Animal
{
};

class Camel : virtual public Animal
{
};

class SheepCamel : public Sheep, public Camel
{
public:
    SheepCamel()
    {
        cout << "SheepCamel 构造函数" << endl;
    }
};

int main()
{
    SheepCamel sc;
    sc.Sheep::age = 10;
    sc.age = 10;
}