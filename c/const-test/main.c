#include <stdio.h>
const int globals = 10;
int main(int argc, char *argv[])
{
    // int *p = &globals;
    // *p = 101;
    // printf("%d\n", globals);
    const int local = 10;
    int *local_pointer = &local;
    *local_pointer = 10222;
    printf("%d\n", local);
    return 0;
}