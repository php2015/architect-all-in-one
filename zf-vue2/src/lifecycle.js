export function mountComponent(vm, el) {
  // console.log(vm);
  // console.log(el);

  // 更新函数 数据变化后，会再次调用这个函数
  let updateComponent = () => {
    // 在这个函数的内部核心只做了两件事情 1、调用render方法生成虚拟dom 2、使用render方法 渲染真实的dom
    // 后续更新可以调用 updateComponent 这个方法
    vm._update(vm._render());
  }
  // 第一次渲染的时候先调用一次
  updateComponent();
}