const classDecorator = (target: any) => {
  return class extends target {
    fuel = 100;
    launch() {
      console.log('hhh');
    }
  };
};

const myDecorator = (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  console.log(target);
};
const propertyDecorator = (target: Object, propertyKey: string) => {};

@classDecorator
class Rocket {
  @myDecorator
  launch() {
    console.log('Launching rocket in 3... 2... 1... 🚀');
  }
}

const rocket = new Rocket();
rocket.launch();
