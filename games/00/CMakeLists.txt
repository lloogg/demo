cmake_minimum_required (VERSION 3.0.0)
set(CMAKE_TOOLCHAIN_FILE "C:/vcpkg/scripts/buildsystems/vcpkg.cmake")

project (Transformation)
find_package(Eigen3 REQUIRED)
include_directories(EIGEN3_INCLUDE_DIR)
add_executable (Transformation main.cpp)
target_link_libraries(Transformation Eigen3::Eigen)
