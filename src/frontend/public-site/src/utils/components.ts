import Vue, { VueConstructor } from 'vue';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const darkComponentHoc = (
  name: string,
  component: VueConstructor<Vue>
) =>
  Vue.extend({
    name,
    inheritAttrs: false,
    render(h) {
      const children = Object.keys(this.$slots).map((slot) =>
        h('template', { slot }, this.$slots[slot])
      );
      return h(
        component,
        {
          on: this.$listeners,
          attrs: { outlined: this.$vuetify.theme.dark, ...this.$attrs },
          scopedSlots: this.$scopedSlots
        },
        children
      );
    }
  });

export const registerComponents = (() => {
  let ran = false;
  return () => {
    if (ran) return;
    const requireComponent = require.context(
      '../components',
      false,
      /[A-Z]\w+\.(vue|js|ts)$/
    );

    requireComponent.keys().forEach((fullPath) => {
      const config = requireComponent(fullPath);
      const filename = fullPath
        .split('/')
        .pop()
        ?.replace(/\.\w+$/, '');
      if (filename !== undefined) {
        Vue.component(filename, config.default || config);
      }
    });
    ran = true;
  };
})();
