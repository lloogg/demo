#include <iostream>
using namespace std;

int main() {
    int *p = NULL;
    const int *p2 = NULL;
    const_cast<const int *>(p);
    const_cast<int *>(p2);
    return 0;
}