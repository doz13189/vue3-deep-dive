# Vue 3 の Composition API における watch vs watchEffect

## はじめに
Composition API を使用する上で、`watch` と `watchEffect` って何の違いがあって、どういう時にどっちを使えばいいのか、わからなかったです。
Vue3 の公式ドキュメントには、`watchEffect` と比べて `watch` には以下のメリットがある、と書かれています。あまりにサラッと書かれていて、腹落ちしなかったので、これらを整理した結果をメモとして残します。

> 1. 作用の効率的な実行
> 1. ウォッチャの再実行条件の明文化
> 1. ウォッチされている状態に対しての、変更前後の値両方へのアクセス
https://v3.ja.vuejs.org/guide/reactivity-computed-watchers.html#watch


## 結論
大きな違いは定義の仕方なので（あくまでも個人的な結論）、どちらでも好きな方を使えばいいと思います。`watch` と `watchEffect` は、実装上の違いはありますが、ユースケースを考えたとき、どちらの方が何に向いている、という決定的な違いはないかな、と思ったので、こういう結論です。（`watch` と `watchEffect` の使い分けに関するコメントがあれば頂きたい...）

ただ、`watchEffect` の方がシンプルに定義できるので、様々な場面でスッキリとコードを書けるのは `watchEffect` の方だと思います。少なくとも Composition API を使う人は、 `watchEffect` を使う方が多いと思います。


## watch と watchEffect の違い

公式ドキュメントとは、若干異なりますが（重複もあります）、個人的に見た中でここが違うな、と思った部分を3つピックアップしています。

- 監視対象の定義の仕方
- watch は変更前と変更後の値が取得できる
- 初回実行のタイミング


## 監視対象の定義の仕方

`watch` は、監視対象のオブジェクトを第 1 引数に指定します。
`watchEffect` は、関数の中で使用されているリアクティブオブジェクトが監視対象になります。
リアクティブオブジェクトは、`reactive()` や `ref()` により定義されたオブジェクトのことを指しています。

```javascript
const { ref, watchEffect, watch } = require('vue')

const price = ref(100)
const count = ref(1)
let watchResult = 0
let watchEffectResult = 0

// 監視対象は price であり count は監視対象外
watch(price, () => {
  watchResult = price.value * count.value
})

// 監視対象は price と count
watchEffect(() => {
  watchEffectResult = price.value * count.value
})
```

`watch` は、明示的に監視対象を指定しているのに対し、`watchEffect` は明示的には監視対象を指定しません。

ここからは個人的な意見です。この違いが `watch` と `watchEffect` の中で、一番大きいと思います。
( 念の為に... `watch` では複数のオブジェクトを監視できない、というわけではないです。第 1 引数に配列で渡せば複数のオブジェクトを監視対象にできます。)
`watch` は、明示的に監視対象を指定している分、Vue の初心者にとっては扱いやすいのではないかと思います（半年前の自分だったら `watch` を使います...）。
一方、 `watchEffect` の方が定義の仕方はシンプルです。ある程度 Composition API のリアクティブシステムに親しみがある方にとっては、`watchEffect` の方がシンプルで良いね、となるのではないでしょうか。

> 1. 作用の効率的な実行
> 1. ウォッチャの再実行条件の明文化

公式で言及されている違いも上記に含まれるのではないかと思います。
`watch` の明示的な監視対象の指定は、まさに **ウォッチャの再実行条件の明文化** に該当するのだと思います。**作用の効率的な実行** の方は具体的に何を指しているのかはわからないので推察になりますが、明示的に指定した監視対象が変更されたときにのみ実行される `watch` に対して、`watchEffect` は監視対象ではあるが、特に実行する必要がないタイミングでも、`watchEffect` が実行される可能性がある、ということかなと思います。

## watch の変更前と変更後の値が取得できる

`watch` は、変更前と変更後の値が引数として渡されます。`watchEffect` は、渡されないです。

```javascript
watch(price, (newValue, oldValue) => {
  console.log({ newValue })
  console.log({ oldValue })
})
```
`watchEffect` で同じことをやろうと思ったら、自分で変更前と変更後の値を定義する必要があります。個人的には、定義すればいいんじゃない？と思うので、差ではありますが、あまり気にしなくていいかなと思います。

> 1. ウォッチされている状態に対しての、変更前後の値両方へのアクセス

これは公式ドキュメントでも言及されており、そのままです。


## 初回実行のタイミング

`watch` は、定義時には実行されません。
`watchEffect` は、定義時に実行されます。
`watch` と `watchEffect` を定義した直後に、それぞれの関数の結果を `console.log` で表示しています。

```javascript
const { ref, watchEffect, watch } = require('vue')

const price = ref(100)
const count = ref(1)
let watchResult = 0
let watchEffectResult = 0

watch(price, () => {
  watchResult = price.value * count.value
})

watchEffect(() => {
  watchEffectResult = price.value * count.value
})

console.log({ watchResult })
// 0 で定義し、値は更新されず、0 のまま
// { watchResult: 0 }

console.log({ watchEffectResult })
// 0 で定義したが、値は更新され、100 になっている
// { watchEffectResult: 100 }
```

`watch` の初回実行のタイミングは、監視対象のオブジェクトが変更されたタイミングです。
上記の例の場合だと、`price` を変更したタイミングが `watch` の初回実行タイミングです。

ここからは個人的な意見です。この違いは、覚えておこうレベルだと思います。
Web の初期表示時などで覚えておかないとハマりそうかなー、という程度です。

これは公式ドキュメントでは特に言及されておらず、当たり前のことだよね？という扱いなのかもしれません。


## まとめ

冒頭の結論に書いた通りです。自分は、`watchEffect` を使います。
