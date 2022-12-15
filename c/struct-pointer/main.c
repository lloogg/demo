#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct {
    int id;
    char name[32];
    char sex;
    int age;
} STU;
int main()
{
    STU *stu;
    stu = (STU *)malloc(sizeof(STU));
    stu->id = 100;
    strcpy(stu->name, "张三");
    stu->age = 10;
    printf("%d %s %d\n", stu->age, stu->name, stu->id);
}

