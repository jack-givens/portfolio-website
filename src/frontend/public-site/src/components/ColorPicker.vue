<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
    :nudge-left="150"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="primary" v-on="on" v-bind="attrs" class="mx-2">
        <v-icon>mdi-palette</v-icon>
      </v-btn>
    </template>
    <v-sheet class="px-4 py-2">
      <div class="d-flex flex-row align-center">
        <v-icon left>mdi-weather-night</v-icon>
        <div class="option">Dark Mode</div>
        <v-spacer />
        <v-switch dense v-model="$vuetify.theme.dark" />
      </div>
      <div class="d-flex flex-row align-center">
        <v-icon left>mdi-palette</v-icon>
        <div class="option">Color</div>
        <v-spacer />
        <v-color-picker
          show-swatches
          hide-canvas
          hide-inputs
          hide-mode-switch
          hide-sliders
          :swatches="swatches"
          v-model="color"
        />
      </div>
    </v-sheet>
  </v-menu>
</template>
<script lang="ts">
import Vue from 'vue';
import { VuetifyThemeItem } from 'vuetify/types/services/theme';

const invertHexSlice = (hexSlice: string): string =>
  (255 - parseInt(hexSlice, 16)).toString(16).padStart(2, '0');

//only meant to take longform hex string (#FFFFFF)
const invertHex = (hex: string): string => {
  let result = '#';
  for (let i = 1; i < 7; i += 2) {
    result += invertHexSlice(hex.slice(i, i + 2));
  }
  return result;
};

export default Vue.extend({
  data: () => ({
    menu: false,
    swatches: [
      ['#fa371a'],
      ['#f27d23'],
      ['#f9c914'],
      ['#42ceb6'],
      ['#2baef5'],
      ['#6460ff']
    ]
  }),
  computed: {
    color: {
      get(): VuetifyThemeItem {
        return this.$vuetify.theme.currentTheme.primary;
      },
      set(val: string): void {
        const { dark, light } = this.$vuetify.theme.themes;
        dark.primary = light.primary = val;
        dark.secondary = light.secondary = invertHex(val);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.option {
  margin-right: 30px;
}
::v-deep .v-color-picker__swatch {
  margin-bottom: 0px;
}
</style>
