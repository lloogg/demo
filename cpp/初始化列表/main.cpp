#include <iostream>
#include <string>
#include <cstring>
using namespace std;
class Game
{
public:
    Game(string name)
    {
        game_name = name;
        cout << "Game 构造函数" << endl;
    }
    ~Game()
    {
        cout << "Game 析构函数" << endl;
    }
    string game_name;
};

class Phone
{
public:
    Phone(string name)
    {
        phone_name = name;
        cout << "Phone 构造函数" << endl;
    }
    ~Phone()
    {
        cout << "Phone 析构函数" << endl;
    }
    string phone_name;
};
class Person
{
public:
    explicit Person(int p_age, string phone_name, string game_name) : age(p_age), phone(phone_name), game(game_name)
    {
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
        cout << age << " " << phone.phone_name << " " << game.game_name << endl;
    }
    int age;
    Phone phone;
    Game game;
};
int main()
{
    Person p1(10, "诺基亚", "贪吃蛇");
    p1.show();
}