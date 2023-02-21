#include <iostream>
#include "vec3.h"
#include "color.h"
int main()
{

    // Image

    const int image_width = 256;
    const int image_height = 256;

    // Render

    std::cout << "P3\n"
              << image_width << ' ' << image_height << "\n255\n";

    for (int j = 0; j < image_height; j++)
    {
        std::cerr << "\rScanlines remaining: " << j << " " << std::flush;
        for (int i = 0; i < image_width; ++i)
        {
            auto r = double(i) / (image_width - 1);
            auto g = double(j) / (image_height - 1);
            auto b = 0.25;
            color pixel_color(r, g, b);
            write_color(std::cout, pixel_color);
        }
    }
    std::cerr << "\nDone.\n";

    // vec3 vec(1.0, 3.0, 1.0);
    // double one = vec[0];
    // double two = vec[1];
    // double three = vec[2];
    // std::cout << std::endl;
    // std::cout << one << " " << two << " " << three << std::endl;
    // std::cout << vec.length() << std::endl;
}