#include <iostream>
#include <string>
#include <cstring>
using namespace std;
// 类的默认成员是私有的，权限有 public、protected、private
class Person
{
public:
    explicit Person(int p_age, const char *p_name)
    {
        age = p_age;
        name = (char *)malloc(strlen(p_name) + 1);
        strcpy(name, p_name);
    }
    // 析构函数，销毁之前自动调用
    ~Person()
    {
        cout << name << endl;
        if (name != NULL)
        {
            free(name);
            name = NULL;
        }
        cout << "析构函数" << endl;
    }

    int age;
    char *name;
    void printName()
    {
        cout << name << endl;
    }
};
int main()
{
    const char *name = "小明";
    Person p1(10, name);
    Person p2(p1); // 报错
}