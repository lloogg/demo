cmake_minimum_required (VERSION 3.0.0)

project (Transformation)
find_package(OpenCV REQUIRED)
# include_directories(EIGEN3_INCLUDE_DIR)
add_executable (Transformation main.cpp)
target_link_libraries(Transformation ${OpenCV_LIBRARIES})
