function getActualEventName(name: string) {
  return name.split('.')[0];
}
let obj = {
  map: new Map<Element, Map<string, Function[]>>(),
  unique: '-x1',
  query(el: Element) {
    if (!this.map.has(el)) {
      this.map.set(el, new Map<string, Function[]>());
    }
    this.el = el;
    return this;
  },
  on(name: string, fn: Function, data?: any) {
    // 改成了 custom event，添加对额外数据支持
    let actualName = getActualEventName(name);
    let fnn =
      actualName === name
        ? () => {
            let event = new CustomEvent(name + this.unique, { detail: data });
            this.el.addEventListener(name + this.unique, fn);
            this.el.dispatchEvent(event);
            this.el.removeEventListener(name + this.unique, fn);
          }
        : () => {
            // 只触发一次自定义事件，触发之后立马删除该自定义事件
            let event = new CustomEvent(name, { detail: data });
            this.el.addEventListener(name, fn);
            this.el.dispatchEvent(event);
            this.el.removeEventListener(name, fn);
          };
    // jquery 里面同一个方法注册多次，将触发多次，但是 addEventListener 同一个方法注册多次，只会触发一次
    // 这里我把方法写入了 fnn 中，每次调用 on 方法，注册的函数是独立的
    this.el.addEventListener(actualName, fnn);
    let listener = this.map.get(this.el);
    if (!listener.get(name)) {
      listener.set(name, []);
    }
    listener.get(name).push({ fn, fnn });
    return this;
  },
  off(name: string, fn: Function) {
    let listener = this.map.get(this.el);
    let actualName = getActualEventName(name);
    // TODO if actualName === name, then remove all events that match the name
    if (fn) {
      // 如果名字相同，把所有该名字 match 的方法都移除
      if (actualName === name) {
        listener.forEach((item, key) => {
          if (key.startsWith(name)) {
            console.log(key);
            listener.get(key).forEach((k) => {
              if (k.fn === fn) {
                this.el.removeEventListener(name, k.fnn);
              }
            });
            listener.set(key, []);
          }
        });
      } else {
        // 名字不同
      }
    } else {
      // 如果没有提供 fn，把所有注册的事件都清空
      if (actualName === name) {
        listener.forEach((item, key, map) => {
          if (key.startsWith(name)) {
            listener.get(key).forEach((k) => {
              this.el.removeEventListener(name, k.fnn);
            });
            listener.set(key, []);
          }
        });
      } else {
        listener.get(name).forEach((item) => {
          this.el.removeEventListener(actualName, item.fnn);
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

query(root).on('click.v0', fn, { data: 'data' });
query(root).on('click.v0', fn, { data: 'data' });
query(root).on('click.v0', fn, { data: 'data' });
query(root).on('click.v0', fn, { data: 'data' });
query(root).on('click.v1', fn, { data: 'data' });
query(root).on('click.v1', fnnn, { data: 'pog' });
// query(root).off('click.v0', fn, { data: 'data' }));
// console.log(query(root).off('click.v1', fn, { data: 'data' }));
query(root).on('click', fnnn, { data: 'clllllick' });
console.log(query(root).off('click', fn));

// console.log(query(root).on('click.v1', fn, { data: 'pog' }));
// console.log(query(root).off('click.v0', fn, { data: 'data' }));
