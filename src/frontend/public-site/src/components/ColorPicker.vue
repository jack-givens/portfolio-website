<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="primary" v-on="on" v-bind="attrs">Hi</v-btn>
    </template>
    <v-card>
      <v-card-subtitle>Theme Chooser</v-card-subtitle>
      <v-color-picker
        show-swatches
        hide-canvas
        hide-inputs
        hide-mode-switch
        hide-sliders
        :swatches="swatches"
      />
    </v-card>
  </v-menu>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({
    menu: false,
    swatches: [
      ['#d32f2f', '#f57c00', '#fbc02d'],
      ['#388e3c', '#00acc1', '#1976d2'],
      ['#512da8', '#7b1fa2', '#c2185b']
    ]
  })
});
</script>
