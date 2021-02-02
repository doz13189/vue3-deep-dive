let product = { price: 5, quantity: 2 }
let total = 0

let effect = function () {
  total = product.price * product.quantity
}

// track()
effect()
