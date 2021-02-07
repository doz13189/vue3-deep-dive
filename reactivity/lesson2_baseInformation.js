let product = { price: 5, quantity: 2 }
console.log('quantity is ' + product.quantity)
// or 
console.log('quantity is ' + product['quantity'])
console.log('quantity is ' + Reflect.get(product, 'quantity'))

let proxiedProduct1 = new Proxy(product, {})
console.log(proxiedProduct1.quantity)

let proxiedProduct2 = new Proxy(product, {
  get() {
    console.log('Get was called')
    return 'Not the value'
  }
})
console.log(proxiedProduct2.quantity)

let proxiedProduct3 = new Proxy(product, {
  get(target, key) {  // <--- The target (our object) and key (the property name)
    console.log('Get was called with key = ' + key)
    return target[key]
  }
})

console.log(proxiedProduct3.quantity)

let proxiedProduct4 = new Proxy(product, {
  get(target, key, receiver) {  
    console.log('Get was called with key = ' + key)
    return Reflect.get(target, key, receiver) 
  },
  set(target, key, value, receiver) {
    console.log('Set was called with key = ' + key + ' and value = ' + value)
    return Reflect.set(target, key, value, receiver)
  }
})

proxiedProduct4.quantity = 4
console.log(proxiedProduct4.quantity))

