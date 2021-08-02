function getEventName(name: string) {
  return name.split('.')[0];
}
let obj = {
  map: new Map<Element, Map<string, Function[]>>(),
  unique: '.x1',
  query(el: Element) {
    if (!this.map.has(el)) {
      this.map.set(el, new Map<string, Function[]>());
    }
    this.el = el;
    return this;
  },
  on(name: string, fn: Function, data?: any) {
    // 改成了 custom event，添加对额外数据支持
    let eventName = getEventName(name);
    // 如果名称和 dom event 的名称一致就会起冲突，所以这里加了一个 unique 字符串
    let actualName = eventName === name ? name + this.unique : name;
    let fnn = () => {
      let event = new CustomEvent(actualName, { detail: data });
      this.el.addEventListener(actualName, fn);
      this.el.dispatchEvent(event);
      this.el.removeEventListener(actualName, fn);
    };
    // jquery 里面同一个方法注册多次，将触发多次，但是 addEventListener 同一个方法注册多次，只会触发一次
    // 这里我把方法写入了 fnn 中，每次调用 on 方法，注册的函数是独立的
    this.el.addEventListener(eventName, fnn);
    let listener = this.map.get(this.el);
    if (!listener.get(actualName)) {
      listener.set(actualName, []);
    }
    listener.get(actualName).push({ fn, fnn });
    return this;
  },
  off(name: string, fn: Function) {
    let listener = this.map.get(this.el);
    let eventName = getEventName(name);
    let actualName = eventName === name ? name + this.unique : name;
    if (fn) {
      // 如果名字相同，把所有该名字 match 的方法都移除
      if (eventName === name) {
        listener.forEach((item, key) => {
          if (key.startsWith(name)) {
            console.log(key);
            listener.get(key).forEach((item) => {
              if (item.fn === fn) {
                console.log(true);
                this.el.removeEventListener(eventName, item.fnn);
              }
            });
            let temp = listener.get(key).filter((item) => {
              return item.fn !== fn;
            });
            listener.set(key, temp);
          }
        });
      } else {
        listener.get(name).forEach((item) => {
          if (item.fn === fn) {
            this.el.removeEventListener(eventName, item.fnn);
          }
        });
        let temp = listener.get(name).filter((item) => {
          return item.fn !== fn;
        });
        listener.set(name, temp);
      }
    } else {
      // 如果没有提供 fn，把所有注册的事件都清空
      if (eventName === name) {
        listener.forEach((item, key) => {
          if (key.startsWith(eventName)) {
            listener.get(key).forEach((k) => {
              this.el.removeEventListener(eventName, k.fnn);
            });
            listener.set(key, []);
          }
        });
      } else {
        console.log(name);
        listener.get(name).forEach((item) => {
          this.el.removeEventListener(eventName, item.fnn);
        });
        listener.set(name, []);
      }
    }
    return this;
  },
};
let query = obj.query.bind(obj);
function fn(e) {
  console.log(e.detail);
}
function fnnn(e) {
  console.log(e.detail);
}

let root = document.querySelector('.root');

// test2();
// test3();
// test4();
test5();
function test1() {
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fnnn, { data: 'data' });
  console.log(query(root).off('click.v0', fn).map);
}

function test2() {
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fnnn, { data: 'data' });
  console.log(query(root).off('click.v0').map);
}

function test3() {
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fnnn, { data: 'data' });
  query(root).on('click.v1', fn, { data: 'data' });
  query(root).on('click.v1', fnnn, { data: 'data' });
  query(root).on('click.v2', fn, { data: 'data' });
  query(root).on('click.v2', fnnn, { data: 'data' });
  query(root).on('click', fn, { data: 'data' });
  query(root).on('click', fnnn, { data: 'data' });

  console.log(query(root).off('click', fn).map);
}

function test4() {
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fn, { data: 'data' });
  query(root).on('click.v0', fnnn, { data: 'data' });
  query(root).on('click.v1', fnnn, { data: 'data' });
  query(root).on('click.v2', fnnn, { data: 'data' });
  console.log(query(root).off('click').map);
}

function test5() {
  query(root).off('click');
}
