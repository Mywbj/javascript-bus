import { changeEmitHanlders } from './utils.js'
class JavascriptBus {
  constructor() {
    this.eventBus = {}
  }

  on(eventName, eventCallback, pointer) {
    if (typeof eventName !== "string") {
      throw new TypeError("the event name must be string type.")
    }

    if (typeof eventCallback !== "function") {
      throw new TypeError("the event callback must be function type.")
    }

    let hanlders = this.eventBus[eventName]
    if (!hanlders) {
      hanlders = []
      this.eventBus[eventName] = hanlders
    }

    hanlders.push({ eventCallback, pointer })

    // 返回一个取消订阅函数，调用它即可停止监听
    // Returns an unsubscribe function Call it to stop listening.
    return this.off.bind(this, eventName, eventCallback)
  }

  once(eventName, eventCallback, pointer) {
    if (typeof eventName !== "string") {
      throw new TypeError("the event name must be string type.")
    }

    if (typeof eventCallback !== "function") {
      throw new TypeError("the event callback must be function type.")
    }

    const newCallback = (...payload) => {
      this.off(eventName, newCallback)
      eventCallback.apply(pointer, payload)
    }

    this.on(eventName, newCallback, pointer)
  }

  off(eventName, eventCallback) {
    if (typeof eventName !== "string") {
      throw new TypeError("the event name must be string type.")
    }

    let hanlders = this.eventBus[eventName]
    if (hanlders) {
      if (typeof eventCallback !== "function") {
        delete this.eventBus[eventName]
        return
      }
      const backups = [...hanlders]
      backups.forEach((hanlder, index) => {
        if (hanlder.eventCallback === eventCallback) {
          hanlders.splice(index, 1)
        }
      })

      if (hanlders.length === 0) {
        delete this.eventBus[eventName]
      }
    }
  }

  emit(eventName, ...payload) {
    const isArray = Array.isArray(eventName)
    if (!(typeof eventName === "string" || isArray)) {
      throw new TypeError("the event name must be of string or array type")
    }

    if (isArray) {
      eventName.forEach(key => {
        if (typeof key !== "string") {
          throw new TypeError("the event name must be string type.")
        }
        changeEmitHanlders(this.eventBus[key], payload)
      })
      return
    }

    changeEmitHanlders(this.eventBus[eventName], payload)
  }

}

export default JavascriptBus
