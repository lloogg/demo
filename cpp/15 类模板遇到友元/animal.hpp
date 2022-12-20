template <class T1, class T2>
class Animal
{
        /**
         * @brief 这其实是一个全局函数
         * 
         * @param animal 
         * @return T1 
         */
        friend T1 getPrivate(Animal &animal)
        {
                return animal.age;
        }

private:
        T1 age;

public:
        T2 data;
        Animal(T1 age, T2 data)
        {
                this->age = age;
                this->data = data;
        }
};

template <class T1, class T2>
class Cat : public Animal<T1, T2>
{

public:
        Cat(T1 age, T2 data) : Animal<T1, T2>(age, data){

                               };
};
