let obj = {
  map: new Map<Element, Map<string, Function[]>>(),
  query(el: Element) {
    if (!this.map.has(el)) {
      this.map.set(el, new Map<string, Function[]>());
    }
    this.el = el;
    return this;
  },
  on(name: string, fn) {
    this.el.addEventListener(name, fn);
    let listener = this.map.get(this.el);
    if (!listener.get(name)) {
      listener.set(name, []);
    }
    listener.get(name).push(fn);
    return this;
  },
  off(name: string, fn) {
    let listener = this.map.get(this.el);
    if (fn) {
      this.el.removeEventListener(name, fn);
      let idx = listener.get(name).indexOf(fn);
      if (idx !== -1) {
        listener.get(name).splice(idx, 1);
      }
    } else {
      listener.get(name).forEach((event) => {
        this.el.removeEventListener(name, event);
      });
      listener.set(name, []);
    }
    return this;
  },
};
let query = obj.query.bind(obj);
export { query };
