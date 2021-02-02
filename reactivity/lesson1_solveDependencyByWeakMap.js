const targetMap = new WeakMap()

const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  dep.add(effect)
}

const trigger = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }

  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

let product = { price: 5, quantity: 2 }
let total = 0
let effect = () => { total = product.price * product.quantity }

track(product, 'quantity')
effect()
console.log(total) // => 10

product.quantity = 3
trigger(product, 'quantity')
console.log(total) // => 15


