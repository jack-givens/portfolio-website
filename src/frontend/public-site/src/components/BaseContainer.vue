<template>
  <v-container
    v-bind="$attrs"
    v-on="$listeners"
    :style="{ padding: padding + 'px' }"
  >
    <slot />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  inheritAttrs: false,
  computed: {
    padding(): string {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '6';
        case 'sm':
          return '12';
        case 'md':
          return '24';
        case 'lg':
          return '48';
        case 'xl':
          return '48';
        default:
          return '24';
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@media (min-width: 1904px) {
  .container {
    max-width: 1185px;
  }
}
</style>
