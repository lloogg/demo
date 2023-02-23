#include <iostream>
#include "rtweekend.h"
#include "sphere.h"
#include "color.h"
#include "hittable_list.h"
#include "camera.h"
double hit_sphere(const point3 &center, double radius, const ray &r)
{
    vec3 oc = r.origin() - center;
    auto op_square = dot(r.direction(), r.direction());
    auto oc_square = dot(oc, oc);
    auto two_op_oc = dot(r.direction(), oc) * 2.0;
    auto discriminant = op_square + oc_square + two_op_oc - radius * radius;

    auto a = op_square;
    auto b = two_op_oc;
    auto c = oc_square - radius * radius;
    if (discriminant < 0)
    {
        return (-b - sqrt(b * b - (4 * a * c))) / (2 * a);
    }
    else
    {
        return -1.0;
    }
}
color ray_color(const ray &r, const hittable_list &world)
{
    hit_record rec;
    // auto t = hit_sphere(point3(0, 0, -1), 0.5, r);
    // if (t > 0.0)
    // {
    //     // 法向量
    //     vec3 N = unit_vector(r.at(t) - vec3(0, 0, -1));
    //     return 0.5 * color(N.x() + 1, N.y() + 1, N.z() + 1);
    // }

    if (world.hit(r, 0, infinity, rec))
    {
        return 0.5 * (rec.normal + color(1, 1, 1));
    }

    // std::cerr << r.dir << std::endl;
    vec3 unit_direction = unit_vector(r.direction());
    auto t = 0.5 * (unit_direction.y() + 1.0); // 0 ~ 1

    return (1.0 - t) * color(1.0, 1.0, 1.0) + t * color(0.5, 0.7, 1.0);
}
int main()
{

    // Image
    const auto aspect_ratio = 16.0 / 9.0;

    const int image_width = 400;
    const int image_height = static_cast<int>(image_width / aspect_ratio);
    const int samples_per_pixel = 14;

    // World

    hittable_list world;
    world.add(make_shared<sphere>(point3(0, 0, -1), 0.5));
    world.add(make_shared<sphere>(point3(0, -100.5, -1), 100));
    world.add(make_shared<sphere>(point3(-0.6, -0.6, -0.5), 0.3));

    // Camera
    camera cam;

    // Render

    std::cout << "P3\n"
              << image_width << ' ' << image_height << "\n255\n";

    for (int j = image_height - 1; j >= 0; j--)
    {
        std::cerr << "\rScanlines remaining: " << j << " " << std::flush;
        for (int i = 0; i < image_width; ++i)
        {
            color pixel_color(0, 0, 0);
            for (int s = 0; s < samples_per_pixel; ++s) {
                auto u = (i + random_double()) / (image_width-1);
                auto v = (j + random_double()) / (image_height-1);
                ray r = cam.get_ray(u, v);
                pixel_color += ray_color(r, world);
            }
            write_color(std::cout, pixel_color, samples_per_pixel);
        }
    }
    std::cerr << "\nDone.\n";
    // std::cerr << hit_sphere(point3(1, 1, 1), 0.5, ray(point3(0, 0, 0), vec3(0.1, 0.5, 0.5)));

    // vec3 vec(1.0, 3.0, 1.0);
    // double one = vec[0];
    // double two = vec[1];
    // double three = vec[2];
    // std::cout << std::endl;
    // std::cout << one << " " << two << " " << three << std::endl;
    // std::cout << vec.length() << std::endl;
}