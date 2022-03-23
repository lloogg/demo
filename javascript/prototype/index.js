function a() {
  console.log(this.HTMLElement);
}
a.prototype.HTMLElement = 100;

console.log(a);
// a();
