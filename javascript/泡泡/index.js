class Bubble {
  constructor() {
    let element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.backgroundColor = 'blue';
    element.style.width = '20px';
    element.style.height = '20px';
    element.style.left = Math.random() * 1000 + 'px';
    element.style.top = Math.random() * 1000 + 'px';
    element.style.borderRadius = '50%';
    document.body.append(element);
    this.element = element;
  }

  bb() {
    this.ing = setInterval(() => {
      let dx = Math.random() < 0.5 ? -1 : 1;
      let dy = Math.random() < 0.5 ? -1 : 1;
      let x = parseInt(this.element.style.left);
      let y = parseInt(this.element.style.top);
      this.element.style.left = x + dx + 'px';
      this.element.style.top = y + dy + 'px';
    }, 10);
  }

  stop() {
    clearInterval(this.ing);
  }
}

for (let i = 0; i < 10000; i++) {
  let bubble = new Bubble();
  bubble.bb();
}
