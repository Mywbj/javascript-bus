import JavascriptBus from "../src/index.js";

const jsBus = new JavascriptBus()

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

jsBus.off('msg1', msgFn1)

setTimeout(() => {
  console.log('------setTimeout------')
  jsBus.emit('msg1', 1, 100)
  jsBus.emit('msg2', 2)
  jsBus.emit('msg3', 3)
}, 2000)
