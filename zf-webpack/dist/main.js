;(() => {
  var __webpack_modules__ = {
    "./src/title.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict"
      __webpack_require__.r(__webpack_exports__)
      __webpack_require__.d(__webpack_exports__, {
        default: () => __WEBPACK_DEFAULT_EXPORT__,
        title_age: () => title_age,
      })
      const __WEBPACK_DEFAULT_EXPORT__ = (title_name = "webpack")
      const title_age = "10"
    },
  }

  // The require function
  function __webpack_require__(moduleId) {
    // Create a new module (and put it into the cache)
    var module = {
      exports: {},
    }

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

    // Return the exports of the module
    return module.exports
  }
  
  /************************************************************************/
  /* webpack/runtime/define property getters */
  ;(() => {
    // define getter functions for harmony exports
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          })
        }
      }
    }
  })()

  /* webpack/runtime/hasOwnProperty shorthand */
  ;(() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)
  })()

  /* webpack/runtime/make namespace object */
  ;(() => {
    // define __esModule on exports
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" })
      }
      Object.defineProperty(exports, "__esModule", { value: true })
    }
  })()

  var __webpack_exports__ = {}
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  ;(() => {
    let title = __webpack_require__("./src/title.js")

    console.log(title.default)
    console.log(title.age)
  })()
})()
