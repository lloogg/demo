#include <iostream>
using namespace std;
void swap1(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}
void swap2(int &a, int &b)
{
    int temp = a;
    a = b;
    b = temp;
}

void change_pointer_address(int **q)
{
    *q = (int *)malloc(5 * sizeof(int));
}

void change_pointer_address2(int *&q)
{
    q = (int *)malloc(5 * sizeof(int));
}
void test1()
{
    int a = 10;
    int b = 20;
    swap1(&a, &b);
    cout << a << " " << b << endl;
}
void test2()
{
    int a = 10;
    int b = 20;
    swap2(a, b);
    cout << a << " " << b << endl;
}
void test3()
{
    int *p = NULL;
    printf("%p\n", p);
    change_pointer_address(&p);
    printf("%p\n", p);
}

void test4()
{
    int *p = NULL;
    printf("%p\n", p);
    change_pointer_address2(p);
    printf("%p\n", p);
}
/**
 * @brief 返回静态变量的引用
 * 能不能返回一个变量的引用，看这个变量是否被释放了
 * @return int&
 */
int &test5()
{
    static int a = 10;
    cout << a << endl;
    return a;
}

int main()
{
    test1();
    test2();
    test3();
    test4();
    test5() = 1000;
    test5();
    return EXIT_SUCCESS;
}