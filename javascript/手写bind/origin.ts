console.log('----------------origin----------------');

function func(...args) {
  console.log(this);
}

func.prototype.maiov = function () {};
// func.prototype.maiov = () => {};

let newFunc = func.bind({ a: 1 }, 1, 2, 3);
let newFunc2 = func.bind(1, 2, 3);
newFunc(4, 5, 6);
newFunc2();

let newFuncInstance = new newFunc(4, 5, 6);
console.log(newFuncInstance);
export {};
