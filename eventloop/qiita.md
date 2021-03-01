## Vue3 の nextTick は何か

## DOM の更新は非同期に行われる

Vue は 3.x, 2.x に関わらず、非同期に DOM 更新を実行しています。
DOM 更新が非同期であることは、以下の例で確認することができます。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="app"></div>
  <script>
    const { createApp, nextTick } = Vue

    const App = {
      template: `
          <div ref="sample">
            {{ msg }}
          </div>
      `,
      data() {
        return {
          msg: 'initial value'
        }
      },
      mounted () {
        this.msg = 'mounted value'
        console.log('mounted', this.$refs.sample.innerText)
        // mounted initial value
      }
    }
    createApp(App).mount('#app')
  </script>  
</body>
</html>
```

`this.msg = 'mounted value'` によって DOM 更新が必要なデータ更新をしていますが、直後に実行される `console.log` では、DOM 更新前のデータが出力されています。DOM 更新が同期的なら `console.log` では、`mounted value` が出力されるはずです。
DOM 更新後のデータを確認するためには、DOM 更新をする非同期関数の実行後である必要があります。

`nextTick` は、DOM 更新をする非同期関数を全て実行した後に、第1引数として渡された関数を実行します。そのため、`nextTick` に渡した関数で DOM を確認すると、DOM が更新されていることが確認できます。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="app"></div>
  <script>
    const { createApp, nextTick } = Vue

    const App = {
      template: `
          <div ref="sample">
            {{ msg }}
          </div>
      `,
      data() {
        return {
          msg: 'initial value'
        }
      },
      mounted () {
        this.msg = 'mounted value'
        nextTick(() => {
          console.log('nextTick', this.$refs.sample.innerText)
          // nextTick mounted value
        })
      }
    }
    createApp(App).mount('#app')
  </script>
</body>
</html>
```

`console.log` では、DOM 更新後のデータが出力されています。


## nextTick を実装してみる

稀なケースを除き、基本的には **DOM 更新をする非同期関数を全て実行した後に、DOM を確認すれば、DOM 更新後のデータを確認することができます。** これはとても簡単で、DOM 更新をする非同期関数より後に実行される非同期関数を実行し、その実行後に DOM を確認するだけです。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="app"></div>
  <script>
    const { createApp, nextTick } = Vue

    const App = {
      template: `
          <div ref="sample">
            {{ msg }}
          </div>
      `,
      data() {
        return {
          msg: 'initial value'
        }
      },
      mounted () {
        const self = this

        this.msg = 'mounted value'
        Promise.resolve().then(() => {
          console.log('promise', self.$refs.sample.innerText)
          // promise mounted value
        })
      },
    }
    createApp(App).mount('#app')
  </script>
</body>
</html>
```

DOM 更新をする非同期関数より後に実行される非同期関数は、`Promise` で実装します。とても簡単ですが、DOM 更新後のデータが `console.log` で出力されていることが確認できます。


### まとめ

nextTick について荒くまとめました。
もっと nextTick を理解するには、イベントループ、マクロタスク、マイクロタスクについて理解を深めることが大切です。これらについて知りたい場合、以下の URL は良い助けになると思います。

https://javascript.info/event-loop#macrotasks-and-microtasks
https://www.youtube.com/watch?v=8aGhZQkoFbQ
https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
