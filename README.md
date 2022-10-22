#  javascript-bus

javascript-bus is an event-bus tool that can transfer data anywhere, and can be used by js.

javascript-bus是一个事件总线工具，可以在任何地方传递数据，是js都能使用它。

# 使用教程

### 1、安装依赖

```js
npm install javascript-bus
yarn add javascript-bus
```

### 2、案例

```js
// 引入
import JsBus from "javascript-bus"

const jsBus = new JsBus()

function msgFn1(...payload) {
  console.log('msg1:', this, payload)
}

function msgFn2(...payload) {
  console.log('msg2:', this, payload)
}

function msgFn3(...payload) {
  console.log('msg3:', this, payload)
}

const obj = {name: 'obj'}

jsBus.on('msg1', msgFn1, obj)
jsBus.on('msg2', msgFn2)
jsBus.once('msg3', msgFn3)

jsBus.emit('msg1', 1, 100)
jsBus.emit('msg2', 2)
jsBus.emit('msg3', 3)

jsBus.emit(['msg1', 'msg2'], 999)

jsBus.off('msg1', msgFn1)

setTimeout(() => {
  console.log('------setTimeout------')
  jsBus.emit('msg1', 1, 100)
  jsBus.emit('msg2', 2)
  jsBus.emit('msg3', 3)
}, 2000)
```



