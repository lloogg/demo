class Heap {
  values: number[] = [];

  /**
   * 大顶堆调整
   * @param i 索引
   */
  maxHeapify(i) {
    let size = this.values.length;
    // 左节点
    let left = i * 2;

    // 右节点
    let right = left + 1;

    // 左右节点较大的一个
    let maxlr = null;
    // 无左右节点
    if (left > size && right > size) {
      return;
    }

    // 只有左节点
    if (left <= size && right > size) {
      maxlr = left;
    }

    // 只有右节点
    if (left > size && right <= size) {
      maxlr = right;
    }

    // 同时存在左右节点
    if (left <= size && right <= size) {
      maxlr = this.values[left] < this.values[right] ? right : left;
    }

    if (arr[i] < arr[maxlr]) {
    }
  }
}

let arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(Math.round(Math.random() * 100));
}

console.log(arr);
let heap = new Heap();
console.log(heap.values.length);
