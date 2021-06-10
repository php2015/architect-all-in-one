import { nextTick } from "../utils"

let queue = []
let has = {} // 列表维护存放了哪些watcher

function flushSchedulerQueue() {
  for (let i = 0; i < queue.length; i++) {
    queue[i].run()
  }
  queue = []
  has = {}
  pending = true
}

let pending = false
// 当前执行栈中，代码执行完毕后，会先清空微任务，再清空宏任务
// 希望尽早的执行一次更新操作
export function queueWatcher(watcher) {
  const id = watcher.id

  if (has[id] == null) {
    queue.push(watcher)
    has[id] = true
    // 开启一次更新操作
    if (!pending) {
      nextTick(flushSchedulerQueue, 0)
      pending = true
    }
  }
}
