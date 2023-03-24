#include <Eigen/Core>
#include <iostream>
int main()
{
    Eigen::Vector3f p(2.0f, 1.0f, 1.0f);

    Eigen::Matrix3f rotate;
    rotate << cos(45), -sin(45), 0,
        sin(45), cos(45), 0,
        0, 0, 1;

    Eigen::Matrix3f translate;
    translate << 1, 0, 1,
        0, 1, 2,
        0, 0, 1;

    Eigen::Vector3f w = translate * rotate * p;
    std::cout << w << std::endl;

    return 0;
}