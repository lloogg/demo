function f1() {}
function f2() {}
function f3() {}
function f4() {}

function delegateEvents() {
  document.addEventListener('click', f1);
  document.addEventListener('click', f2);
  document.addEventListener('click', f3);
  document.addEventListener('click', f4);
}
function undelegateEvents() {}
