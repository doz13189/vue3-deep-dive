const vue = require('vue')

const reactivea = vue.reactive({
  a: 3
})

vue.watchEffect(() => {
  console.log(reactivea.a)
})

reactivea.a = 5

