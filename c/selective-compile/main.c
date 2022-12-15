#include <stdio.h>
#define AAA
#ifdef AAA
#define BBB 100
#else
#define CCC 100

#endif

#ifndef AAA
#define BBB 100
#else
#define CCC 100
#endif

#if 1

#else
int globalVar = 100;
#endif
int main()
{
    printf("BBB = %d\n", BBB);
    printf("CCC = %d\n", CCC);
    return 0;
}