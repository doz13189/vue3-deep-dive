const vue = require('vue')
const vtu = require('@vue/test-utils')

const Component = {
  template: `
    <div class="Foo">
      <p>FOO</p>
    </div>
  `,
  setup() {
    return {};
  },
};


describe('sample', () => {

  it('sample', async () => {

    const wrapper = vtu.mount(Component);

    const app = wrapper.find('p')
    console.log(app.text())

    // expect(wrapper.find('[data-testid="search-button"]').attributes().disabled).toMatch('')

    // searchInput.setValue('test')
    // await flushPromises()
    // expect(app).toContain('Three')

  })
})

