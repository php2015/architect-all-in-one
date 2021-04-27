import { Compare, defaultCompare, reverseCompare, swap } from '../util';

export class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }
}

