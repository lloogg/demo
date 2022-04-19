class Hello {
  say() {
    [1, 2, 3].map((i) => {
      console.log(this);
      return i;
    });
  }

  static s() {
    [1].map((i) => {
      console.log(this);
      return i;
    });
  }
}
namespace Hello {
  export function s2() {
    return [1].map((i) => {
      console.log(this);
      return i;
    });
  }
}
Hello.s();
Hello.s2();
