#include <iostream>
using namespace std;
int divide(int a, int b)
{

    if (b == 0)
    {
        throw "除数不能为零";
    }
    return a / b;
}
int main()
{
    int a = 1;
    int b = 0;
    int res;
    try
    {
        res = divide(a, b);
        cout << res << endl;
    }
    catch (const char * e)
    {
        cout << e << endl;
    }
    return 0;
}