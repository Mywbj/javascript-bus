export function changeEmitHanlders(hanlders, payload) {
  if (hanlders) {
    hanlders.forEach(hanlder => {
      hanlder.eventCallback.apply(hanlder.pointer, payload)
    })
  }
}