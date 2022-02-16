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
import { Cam16, Hct, Hex, Rgb } from '../utils/color';

const palettes: Record<string, string[][]> = { dark: [], light: [] };
[
  ['#fa371a'],
  ['#f27d23'],
  ['#f9c914'],
  ['#42ceb6'],
  ['#2baef5'],
  ['#6460ff']
].forEach(([el]) => {
  const argb = new Hex(el).toRgb().toInt();
  const { hue, chroma } = Cam16.fromInt(argb);
  palettes.light.push([
    Rgb.fromInt(new Hct(hue, chroma, 40).toInt()).toHex().toString()
  ]);
  palettes.dark.push([
    Rgb.fromInt(new Hct(hue, chroma, 80).toInt()).toHex().toString()
  ]);
});
export default Vue.extend({
  data: () => ({
    menu: false,
    color: '#6460ff',
    swatches: [
      ['#fa371a'],
      ['#f27d23'],
      ['#f9c914'],
      ['#42ceb6'],
      ['#2baef5'],
      ['#6460ff']
    ]
  }),
  watch: {
    color: {
      immediate: true,
      handler: function (val) {
        this.setTheme(val);
      }
    }
  },
  methods: {
    setTheme(val: string): void {
      const argb = new Hex(val).toRgb().toInt();
      const { hue, chroma } = Cam16.fromInt(argb);
      this.setThemeKey(hue, Math.max(48, chroma), 'primary');
      this.setThemeKey(hue, Math.max(48, chroma), 'success');
      this.setThemeKey(hue, 16, 'secondary');
      this.setThemeKey(hue + 60, 24, 'accent');
      this.setThemeKey(hue, 4, 'info');
      this.setThemeKey(hue, 8, 'warning');
      this.setThemeKey(25, 84, 'error');
    },
    setThemeKey(hue: number, chroma: number, key: string | number): void {
      const { dark, light } = this.$vuetify.theme.themes;
      dark[key] = Rgb.fromInt(new Hct(hue, chroma, 80).toInt())
        .toHex()
        .toString();
      light[key] = Rgb.fromInt(new Hct(hue, chroma, 40).toInt())
        .toHex()
        .toString();
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
