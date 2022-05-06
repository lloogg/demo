console.log('----------------custom----------------');
function func(...args) {
  console.log(this);
  console.log(args);
}
func.prototype.miaov = function () {};
interface Function {
  customBind: any;
}
Function.prototype.customBind = function (thisArg, ...args1) {
  let self = this;
  const result = function (...args2) {
    self.apply(thisArg, [...args1, ...args2]);
  };

  result.prototype = Object.create(self.prototype);
  result.prototype.constructor = self;
  return result;
};

let newFunc3 = func.customBind({ a: 1 }, 1, 2, 3);
newFunc3(4, 5, 6);

// let newFunc4 = new newFunc3();
// newFunc4();
