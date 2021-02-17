
import { h, createApp } from 'vue'

const BasicApp = {
  render() {
    return h('div', {
      id: 'hello'
    }, [
      h('span', 'world')
    ])
  }
}

const vifApp = {
  render() {
    return  this.ok
      ? h('div', { id: 'hello' }, [h('span', 'world')])
      : h('div', 'other')
  }
}

const vforApp = {
  render() {
    return this.list.map(item => {
      return h('div', { key: item.key }, item.text)
    })
  }
}

const Stack = {
  render() {
    // const slot = this.$slots.default && this.$slots.default()
    const slot = this.$slots.default
      ? this.$slots.default()
      : []
    
    // slot.map(vnode => {
    //   return h('div', [vnode])
    // })

    return h('div', { class: 'stack'}, slot.map(child => {
      return h('div', { class: `mt-${this.$props.size}`}, [
        child
      ])
    }))

  }
}

`
<Stack size=4>
  <div>hello</div>
  <div>hello</div>
  <div>hello</div>
  <Stack size=4>
    <div>hello</div>
    <div>hello</div>
  </Stack>
</Stack>
`