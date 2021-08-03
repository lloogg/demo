class View {
  private listeners: EventListener[] = [];
  private el: Node;
  constructor(el: Node) {
    this.el = el;
    this.delegateEvents();
    this.undelegateEvents();
  }

  delegateEvents() {
    let fnn = () => {
      let customEvent = new CustomEvent('custom-event');
      let onMouseClick = this.onMouseClick.bind(this);
      this.el.addEventListener('custom-event', onMouseClick);
      this.el.dispatchEvent(customEvent);
      this.el.removeEventListener('custom-event', onMouseClick);
    };
    fnn = fnn.bind(this);
    this.el.addEventListener('click', fnn);
    this.listeners.push(fnn);
  }

  undelegateEvents() {
    this.listeners.forEach((ev) => {
      this.el.removeEventListener('click', ev);
    });
  }

  onMouseClick(e) {
    console.log(this);
    console.log(e);
  }
}

let view = new View(document);
