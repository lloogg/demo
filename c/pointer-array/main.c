#include <stdio.h>

int main()
{
    int *p[10];
    int a;
    p[0] = &a;
    char *names[] = {"C语言", "Java", "Javascript", "Python", "Golang"};
    for (int i = 0; i < 5; i++)
    {
        printf("%s\n", names[i]);
    }
}