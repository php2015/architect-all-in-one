import React from "react"
import ReactDOM from "react-dom"

let element = (
  <div className="title" style={{ color: "red" }}>
    <span>hello</span>world
  </div>
)

console.log(JSON.stringify(element,null,2));
ReactDOM.render(element, document.getElementById("root"))
