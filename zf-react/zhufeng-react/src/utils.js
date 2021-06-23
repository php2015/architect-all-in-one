import { REACT_TEXT } from "./constants"

export function wrapToVdom(element) {
  // 如果是文本类型的节点，为了后续dom-diff方便比较，这里做一次包裹处理
  if(typeof element === 'string' || typeof element === 'number') {
    return {
      type: REACT_TEXT,
      props: {
        content: element
      }
    }
  } else {
    return element
  }
}
