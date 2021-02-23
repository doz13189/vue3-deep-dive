const { ref, watchEffect, watch } = require('vue')

const price = ref(100)
const count = ref(1)
let watchResult = 0
let watchEffectResult = 0

watch(price, (newValue, oldValue) => {
  console.log({ newValue })
  console.log({ oldValue })
  watchResult = price.value * count.value
})

watchEffect(() => {
  watchEffectResult = price.value * count.value
})

// console.log({ watchResult })
// console.log({ watchEffectResult })

const priceChange = () => {
  price.value += 10
}

// const countChange = () => {
//   count.value += 1
// }


priceChange()
// countChange()
