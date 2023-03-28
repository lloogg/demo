#include <eigen3/Eigen/Eigen>
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

    Eigen::Vector3f a(1, 2, 3);
    Eigen::Vector3f b;
    Eigen::RowVector3f c;
    b << 2, 3, 4;
    c << 2, 3, 4;
    std::cout << "a.cross(b) = " << a.cross(b) << std::endl;
    std::cout << "a.cwiseProduct(b) = " << a.cwiseProduct(b) << std::endl;
    // std::cout << "a.cross3(c) = " << a.cross3(c) << std::endl;
    std::cout << "a * c = " << a * c << std::endl;
    std::cout << "c * a = " << c * a << std::endl;

    return 0;
}