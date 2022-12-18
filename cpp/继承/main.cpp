class Animal {
    public:
        int age;
};

class Dog: public Animal {
    public :
        int tail_len;
};
int main() {
        Dog *dog = new Dog();
        dog->age = 2;
        dog->tail_len = 30;
        delete dog;
}