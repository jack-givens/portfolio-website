<template>
  <v-card flat>
    <v-card-title class="pb-2 pt-0">{{ title }}</v-card-title>
    <v-card-text>
      <div v-for="(item, index) in items" :key="index">
        <slot v-bind="item">
          <v-icon color="accent">mdi-chevron-right</v-icon>
          {{ item }}
        </slot>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['title', 'items']
});
</script>
