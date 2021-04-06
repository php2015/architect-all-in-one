class Subject {
  // 被观察者需要将观察者进行收集
  constructor(name) {
    this.name = name
    this.state = "非常开心"
    this.OberverArr = [] //存放 观察者
  }
  attach(o) {
    this.OberverArr.push(o)
  }
  setState(newState) {
    this.state = newState
    // 被观察者状态更新的时候 通知所有的观察者 去更新
    this.OberverArr.forEach((o) => o.update(this.name, newState))
  }
}

class Oberver {
  constructor(name) {
    this.name = name
  }
  update(s, state) {
    console.log(this.name + ":" + s + state)
  }
}
// vue 数据变了，视图更新 被观察者和观察者 是两个类。
let s = new Subject("小宝宝")
let o1 = new Oberver("爸爸")
let o2 = new Oberver("妈妈")

s.attach(o1)
s.attach(o2)
s.setState("不开心了")
