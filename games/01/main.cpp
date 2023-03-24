#include "Triangle.hpp"
#include "rasterizer.hpp"
#include <eigen3/Eigen/Eigen>
#include <iostream>
#include <opencv2/opencv.hpp>

constexpr double MY_PI = 3.1415926;

Eigen::Matrix4f get_view_matrix(Eigen::Vector3f eye_pos)
{
    Eigen::Matrix4f view = Eigen::Matrix4f::Identity();

    Eigen::Matrix4f translate;
    translate << 1, 0, 0, -eye_pos[0], 0, 1, 0, -eye_pos[1], 0, 0, 1,
        -eye_pos[2], 0, 0, 0, 1;

    view = translate * view;

    return view;
}

Eigen::Matrix4f get_model_matrix(float rotation_angle)
{
    Eigen::Matrix4f model = Eigen::Matrix4f::Identity();

    const double angle = rotation_angle / 180.0 * MY_PI;
    // TODO: Implement this function
    // Create the model matrix for rotating the triangle around the Z axis.
    // Then return it.

    Eigen::Matrix4f rotate;

    rotate << cos(angle), -sin(angle), 0, 0,
        sin(angle), cos(angle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1;

    return rotate * model;
}

Eigen::Matrix4f get_model_matrix_rotate_by_vector(Eigen::Vector3f vector, float rotation_angle)
{
    const float angle = rotation_angle / 180.0 * MY_PI;
    Eigen::Matrix4f model = Eigen::Matrix4f::Identity();

    float nx = vector[0];
    float ny = vector[1];
    float nz = vector[2];

    Eigen::Matrix3f N;
    N << 0, -nz, ny,
        nz, 0, nx,
        -ny, nx, 0;

    Eigen::Matrix3f R = cos(angle) * Eigen::Matrix3f::Identity() + (1 - cos(angle)) * vector * vector.transpose() + sin(angle) * N;

    model << R(0, 0), R(0, 1), R(0, 2), 0,
        R(1, 0), R(1, 1), R(1, 2), 0,
        R(2, 0), R(2, 1), R(2, 2), 0,
        0, 0, 0, 1;

    return model;
}

Eigen::Matrix4f get_projection_matrix(float eye_fov, float aspect_ratio,
                                      float zNear, float zFar)
{
    // Students will implement this function

    float n = -zNear;
    float f = -zFar;
    float t = tan(eye_fov / 180.0 * MY_PI) * zNear;

    float r = t * aspect_ratio;
    float b = -t;
    float l = -r;

    Eigen::Matrix4f projection = Eigen::Matrix4f::Identity();

    // TODO: Implement this function
    // Create the projection matrix for the given parameters.
    // Then return it.

    Eigen::Matrix4f p2o;

    p2o << n, 0, 0, 0,
        0, n, 0, 0,
        0, 0, n + f, -n * f,
        0, 0, 1, 0;

    Eigen::Matrix4f o_translate;
    Eigen::Matrix4f o_scale;

    o_translate << 1, 0, 0, -(l + r) / 2,
        0, 1, 0, -(t + b) / 2,
        0, 0, 1, -(n + f) / 2, 0, 0, 0, 1;

    o_scale << 2 / (r - l), 0, 0, 0,
        0, 2 / (t - b), 0, 0,
        0, 0, 2 / (n - f), 0,
        0, 0, 0, 1;

    return o_scale * o_translate * p2o * projection;
}

int main(int argc, const char **argv)
{
    float angle = 0;
    float eye_fov = 45;
    float w = 10;
    float h = 10;
    float zFar = 50;
    float zNear = 0.1;

    bool command_line = false;
    std::string filename = "output.png";

    if (argc >= 3)
    {
        command_line = true;
        angle = std::stof(argv[2]); // -r by default
        if (argc == 4)
        {
            filename = std::string(argv[3]);
        }
        else
            return 0;
    }

    rst::rasterizer r(700, 700);

    Eigen::Vector3f eye_pos = {0, 0, 5};

    std::vector<Eigen::Vector3f> pos{{2, 0, -2}, {0, 2, -2}, {-2, 0, -2}};

    std::vector<Eigen::Vector3i> ind{{0, 1, 2}};

    auto pos_id = r.load_positions(pos);
    auto ind_id = r.load_indices(ind);

    int key = 0;
    int frame_count = 0;

    if (command_line)
    {
        r.clear(rst::Buffers::Color | rst::Buffers::Depth);

        // r.set_model(get_model_matrix(angle));

        Eigen::Vector3f vector;
        vector << 1, 1, 1;

        r.set_model(get_model_matrix_rotate_by_vector(vector, angle));

        r.set_view(get_view_matrix(eye_pos));
        r.set_projection(get_projection_matrix(eye_fov, 1, 0.1, zFar));

        r.draw(pos_id, ind_id, rst::Primitive::Triangle);
        cv::Mat image(700, 700, CV_32FC3, r.frame_buffer().data());
        image.convertTo(image, CV_8UC3, 1.0f);

        cv::imwrite(filename, image);

        return 0;
    }

    while (key != 27)
    {
        r.clear(rst::Buffers::Color | rst::Buffers::Depth);

        // r.set_model(get_model_matrix(angle));
        Eigen::Vector3f vector;
        vector << 1, 1, 1;

        r.set_model(get_model_matrix_rotate_by_vector(vector, angle));
        r.set_view(get_view_matrix(eye_pos));
        r.set_projection(get_projection_matrix(eye_fov, w / h, zNear, zFar));

        r.draw(pos_id, ind_id, rst::Primitive::Triangle);

        cv::Mat image(700, 700, CV_32FC3, r.frame_buffer().data());
        image.convertTo(image, CV_8UC3, 1.0f);
        cv::imshow("image", image);
        key = cv::waitKey(10);

        std::cout << "frame count: " << frame_count++ << '\n';
        std::cout << "eye_fov: " << eye_fov << '\n';

        if (key == 'a')
        {
            angle += 10;
        }
        else if (key == 'd')
        {
            angle -= 10;
        }
        else if (key == 'h')
        {
            w--;
        }
        else if (key == 'j')
        {
            w++;
        }
        else if (key == 'k')
        {
            zNear--;
        }
        else if (key == 'l')
        {
            zNear++;
        }
    }

    return 0;
}
