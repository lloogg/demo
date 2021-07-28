let h = 100;
let a = {
  h: 1,
  e: function () {
    console.log(this.h);
  },
  l: () => {
    this.h = 200;
    console.log(this.h);
  },
};
a.e();
a.l();
