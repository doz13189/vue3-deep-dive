let product = { price: 5, quantity: 2 }
let total = 0

let dep = new Set()

let effect = () => { total = product.price * product.quantity }
let track = () => { dep.add(effect) }
let trigger = () => { dep.forEach(effect => effect()) }

track()
effect()

product.price = 20
console.log(total) // => 10
trigger()
console.log(total) // => 40


