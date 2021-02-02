const depsMap = new Map()
const track = (key) => {
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(effect)
}

const trigger = (key) => {
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
// let track = () => { dep.add(effect) }
// let trigger = () => { dep.forEach(effect => effect()) }

track('quantity')
effect()
console.log(total) // => 10

product.quantity = 3
trigger('quantity')
console.log(total) // => 15


