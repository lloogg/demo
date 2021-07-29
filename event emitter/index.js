let jack = {
  subscribers: {
    any: [],
  },
  subscribe(type = 'any', fn) {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },
  unsubscribe(type = 'any', fn) {
    this.subscribers[type] = this.subscribers[type].filter((item) => {
      return item !== fn;
    });
  },
  publish(type = 'any', ...args) {
    this.subscribers[type].forEach((item) => {
      item(...args);
    });
  },
};

let tom = {
  readNews(info) {
    console.log(info);
  },
};

jack.subscribe('娱乐', tom.readNews);
jack.subscribe('体育', tom.readNews);
jack.publish('娱乐', 'args');
jack.publish('体育', 'args');
