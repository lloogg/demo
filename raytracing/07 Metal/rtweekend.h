#ifndef RTWEEKEND_H
#define RTWEEKEND_H
#include <cmath>
#include <limits>
#include <memory>
// 等价于 C 中的 <stdlib.h>
#include <cstdlib>

using std::make_shared;
using std::shared_ptr;
using std::sqrt;

const double infinity = std::numeric_limits<double>::infinity();
const double pi = 3.1415926535897932385;

inline double degrees_to_radians(double degrees)
{
    return degrees * pi / 180.0;
}

inline double random_double()
{
    // Returns a random real in [0, 1)
    // C/C++ 中的 rand 函数生成一个 0 到 RAND_MAX 的随机的整数
    // C 语言标准并没有规定 RAND_MAX 的具体数值，只是规定它的值至少为 32767
    return rand() / (RAND_MAX + 1.0);
}

inline double random_double(double min, double max)
{
    // Returns a random real in [min, max)
    return min + (max - min) * random_double();
}

inline double clamp(double x, double min, double max)
{
    if (x < min)
    {
        return min;
    }
    if (x > max)
    {
        return max;
    }
    return x;
}
#include "ray.h"
#include "vec3.h"
#endif