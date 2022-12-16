#include <iostream>
using namespace std;
typedef struct
{
    int age;
    char name[32];
} Stu;
void pointer_reference(int *&q)
{
    q = (int *)malloc(5 * sizeof(char));
}

void pointer_reference2(Stu &q)
{
    q.age = 18;
}

void pointer_reference3(Stu* &q)
{
    q->age = 10;
}
int main()
{
    int *p = NULL;
    pointer_reference(p);
    printf("%p\n", p);
    Stu stu = {10, "小明"};
    pointer_reference2(stu);
    cout << stu.age << endl;
    // pointer_reference3(&stu);
    Stu *q = &stu;
    pointer_reference3(q);
    cout << stu.age << endl;
}