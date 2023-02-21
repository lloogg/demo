#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Person
{
public:
    int age;
    Person(int age)
    {
        this->age = age;
    }
};
void print(int value)
{
    cout << value << endl;
}
void print_person(Person *p)
{
    cout << p->age;
}
void print2d(vector<Person *> v)
{
    for_each(v.begin(), v.end(), print_person);
    cout << endl;
}
int main()
{

    vector<vector<Person *>> person2d;
    for (int i = 0; i < 10; i++)
    {
        vector<Person *> v;
        for (int j = 0; j < 10; j++)
        {
            Person *p = new Person(i);
            v.push_back(p);
        }
        person2d.push_back(v);
    }

    for_each(person2d.begin(), person2d.end(), print2d);

    vector<vector<Person *>>::iterator b1 = person2d.begin();
    vector<vector<Person *>>::iterator e1 = person2d.end();

    while (b1 != e1)
    {
        b1++;

        vector<Person *>::iterator b2 = (*b1).begin();
        vector<Person *>::iterator e2 = (*b1).end();

        while (b2 != e2)
        {
            free(*b2);
            b2++;
        }
    }
}