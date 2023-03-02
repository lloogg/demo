#ifndef SPHERE_H
#define SPHERE_H
#include "hittable.h"
#include "vec3.h"
class sphere : public hittable
{
public:
    point3 center;
    double radius;
    sphere() {}
    sphere(point3 cen, double r) : center(cen), radius(r){};
    virtual bool hit(const ray &r, double t_min, double t_max, hit_record &rec) const override;
};
/**
 * 假设光源是 O，OP 向量表示光线（向量既有方向也有大小），这个光线集中了一个球，产生了一个或两个焦点
 * 最近焦点的坐标为 R
 * 球心为 C，那么 t 就表示了 OR 与 OP 模的比值：|OR| / |OP|
 */
bool sphere::hit(const ray &r, double t_min, double t_max, hit_record &rec) const
{
    vec3 oc = r.origin() - center;
    auto a = r.direction().length_squared();
    auto half_b = dot(oc, r.direction());
    auto c = oc.length_squared() - radius * radius;

    auto discriminant = half_b * half_b - a * c;
    if (discriminant < 0)
    {
        return false;
    }

    auto sqrtd = sqrt(discriminant);

    // Find the nearest root that lies in the acceptable range.
    // 找到 t_min 到 t_max 范围之间的根，找不到就 return false
    auto root = (-half_b - sqrtd) / a;
    if (root < t_min || t_max < root)
    {
        root = (-half_b + sqrtd) / a;
        if (root < t_min || t_max < root)
        {
            return false;
        }
    }

    rec.t = root;
    rec.p = r.at(rec.t);
    // 单位法向量
    vec3 outward_normal = (rec.p - center) / radius;
    rec.set_face_normal(r, outward_normal);
    return true;
}
#endif