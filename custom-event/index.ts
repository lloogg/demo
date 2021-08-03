function getEventName(name: string) {
  return name.split('.')[0];
}
let obj = {
  map: new Map<Element, Map<string, Function[]>>(),
  unique: '.x1',
  query(el: Element) {
    if (!el) {
      return this;
    }
    if (!this.map.has(el)) {
      this.map.set(el, new Map<string, Function[]>());
    }
    this.el = el;
    return this;
  },
  on(name: string, fn: Function, data?: any) {
    if (!this.el) {
      return this;
    }
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
    fnn = fnn.bind(this);
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
    let names = name.split(' ');
    console.log(names);
    names.forEach((name) => {
      if (name.startsWith('.')) {
        if (fn) {
          listener.forEach((value, key) => {
            if (key.endsWith(name)) {
              let eventName = getEventName(key);
              listener.get(key).forEach((item) => {
                if (item.fn === fn) {
                  this.el.removeEventListener(eventName, item.fnn);
                }
              });
              let temp = listener.get(key).filter((item) => {
                return item.fn !== fn;
              });
              if (temp.length === 0) {
                listener.delete(key);
              } else {
                listener.set(key, temp);
              }
            }
          });
        } else {
          listener.forEach((value, key) => {
            if (key.indexOf(name) !== -1) {
              let eventName = getEventName(key);
              listener.get(key).forEach((item) => {
                this.el.removeEventListener(eventName, item.fnn);
              });
              listener.delete(key);
            }
          });
        }
      } else {
        this.unmount(name, fn);
      }
    });

    return this;
  },
  unmount(name: string, fn: Function) {
    let listener = this.map.get(this.el);
    let eventName = getEventName(name);
    if (fn) {
      // 如果名字相同，把所有该名字 match 的方法都移除
      if (eventName === name) {
        listener.forEach((item, key) => {
          if (key.startsWith(name)) {
            listener.get(key).forEach((item) => {
              if (item.fn === fn) {
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
        if (!listener.get(name)) {
          return this;
        }
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
            listener.delete(key);
          }
        });
      } else {
        if (!listener.get(name)) {
          return this;
        }
        listener.get(name).forEach((item) => {
          this.el.removeEventListener(eventName, item.fnn);
        });
        listener.delete(name);
      }
    }
  },
};
let query = obj.query.bind(obj);
export { query };
function fn() {
  console.log('ok');
}
function fnnn(e) {
  console.log(e.detail);
}

let root = document.querySelector('.root');

// test2();
// test3();
// test4();
// test5();
// testNamespace3();
// testNamespace4();
// testNamespace5();
// testNamespace6();
testNamespace7();
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

function testNamespace1() {
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).off('.v1', fn);
}

function testNamespace2() {
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).on('mouseenter.v1', fn);
  query(root).off('.v1', fn);
}

function testNamespace3() {
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).on('mouseenter.v1', () => {
    console.log('ok');
  });
  query(root).off('.v1', fn);
  // 保留 mouseenter
  console.log(query(root));
}

function testNamespace4() {
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).on('mouseenter.v1', () => {
    console.log('ok');
  });
  query(root).off('.v1');
  console.log(query(root));
  // 全部清除
}

function testNamespace5() {
  // * pass
  query(root).on('click.v1', fn);
  query(root).on('click.v2', fn);
  query(root).on('click.v1.v2', fn);
  query(root).on('mouseenter.v1', () => {
    console.log('ok');
  });
  query(root).off('click .v1.v2');
  console.log(query(root));
  // click 事件全部清除，mouseenter保留
}

function testNamespace6() {
  // * pass
  query(root).on('click.v1', fn);
  query(root).on('click.v2', fn);
  query(root).on('click.v1.v2', fn);
  query(root).on('mouseenter.v1', () => {
    console.log('ok');
  });
  query(root).off('.v1');
  console.log(query(root));
  // click 事件清除两个，mouseenter全部清除
}

function testNamespace7() {
  // * fail
  query(root).on('click.v1', fn);
  query(root).on('click.v1', fn);
  query(root).on('click.v1.v2', fn);
  query(root).on('click.v1.v2', fn);
  query(root).off('click.v2', fn);
  console.log(query(root));
}
