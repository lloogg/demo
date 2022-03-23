/**
 * 大顶堆调整
 * 执行该方法后，对于每一个节点，它的都大于它的左节点和右节点
 * 该方法并不是排序，也不是将最大的元素放到堆顶
 * @param i 索引
 * @param n 数组大小
 * @param arr 数组
 */
function maxHeapify(arr: number[], n: number, i: number) {
  // 左节点
  let left = i * 2 + 1;

  // 右节点
  let right = left + 1;

  // 左右节点较大的一个
  let maxlr = null;
  // 无左右节点
  if (left >= n && right >= n) {
    return;
  }

  // 只有左节点
  if (left < n && right >= n) {
    maxlr = left;
  }

  // 只有右节点
  if (left >= n && right < n) {
    maxlr = right;
  }

  // 同时存在左右节点
  if (left < n && right < n) {
    maxlr = arr[left] < arr[right] ? right : left;
  }

  if (arr[i] < arr[maxlr]) {
    swap(arr, i, maxlr);
    maxHeapify(arr, n, maxlr);
  }
}

function swap(arr: number[], a: number, b: number) {
  console.log('swap');
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

/**
 * 从最后一个非叶子节点（ (n - 2) / 2 ）开始，逐个往上 heapify
 * 执行该方法后，最大的元素会放到堆顶
 */
function buildMaxHeap(arr: number[], n: number) {
  let last = n - 1;
  // 父节点
  let parent = Math.floor((last - 1) / 2);

  // 对最后一个非叶子节点之前的所有非叶子节点，都执行 heapify 操作
  for (let i = parent; i >= 0; i--) {
    maxHeapify(arr, n, i);
  }
}
/**
 * 对一个大小为 n 的数组做堆排序
 * @param arr
 * @param n
 */
function heapSort(arr: number[], n: number) {
  buildMaxHeap(arr, n);
  for (let i = n - 1; i >= 0; i--) {
    swap(arr, i, 0);
    maxHeapify(arr, i, 0);
  }
}
// let arr = [];
// for (let i = 0; i < 10; i++) {
//   arr.push(Math.round(Math.random() * 100));
// }
let arr = [67, 89, 83, 24, 25, 56, 92, 97, 70, 9];

console.log(arr);
maxHeapify(arr, arr.length, 0);
console.log(arr);
// console.log(heap.values.length);
// maxHeapify(arr, arr.length, 0);
// buildMaxHeap(arr, arr.length);
// console.log(arr);
// heapSort(arr, arr.length);
// console.log(arr);
