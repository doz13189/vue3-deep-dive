- In Vue 2 Reactivity we used depend and notify for recording and playing back effects, and in Vue 3 we use track and trigger, why the change?  

- In Vue 2 Reactivity Dep is a class with subscribers, and in Vue 3 dep is simply a Set. Why the change?
Dep is track, subscribers is trigger. Set remain.
performance reason. class is nolonger nessary.

- How did you end up with the effect storage solution in Vue 3? i.e. targetMap and depsMap

- Why use Object Accessors with ref rather than just re-using reactive?
performance and purpose.
target of reactive is object.

- Using Reflect & Proxy in Vue 3 allows us to add properties later that we want to be reactive, but what other benefits does this give us?
lazy.


reactivity.cjs.js
reactivity.cjs.prod.js
reactivity.esm-browser.js
reactivity.esm-browser.prod.js
reactivity.esm-bundler.js
reactivity.global.js
reactivity.global.prod.js
