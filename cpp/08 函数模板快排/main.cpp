#include <iostream>
#include <string>
using namespace std;
template <class T>
void swap_temp(T &a, T &b)
{
    T temp = a;
    a = b;
    b = temp;
}
template <typename T>

void array_sort(T &arr, int s, int e)
{

    if (s >= e)
    {
        return;
    }
    int pointer = e;
    int i = s;
    int j = e;
    while (i < j)
    {

        while (i < j && arr[i] <= arr[pointer])
        {
            i++;
        }
        while (i < j && arr[j] >= arr[pointer])
        {
            j--;
        }
        swap_temp(*(arr + i), *(arr + j));
    }
    swap_temp(*(arr + i), *(arr + e));
    array_sort(arr, s, i - 1);
    array_sort(arr, i + 1, e);
}
template <class T>
void arrSort(T &arr, int length)
{
    array_sort(arr, 0, length - 1);
}
int main()
{
    int a = 1;
    int b = 2;
    swap_temp(a, b); // 自动推导
    char c = 'a';
    char d = 'b';
    swap_temp<char>(c, d); // 显示指定类型

    cout << a << " " << b << endl;
    cout << c << " " << d << endl;

    int arr[] = {3, 5, 8, 1, 2, 9, 4, 7, 6};
    int length = sizeof(arr) / sizeof(int);
    arrSort(arr, length);

    for (int i = 0; i < length; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;
}