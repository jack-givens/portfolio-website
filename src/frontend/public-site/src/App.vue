<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <div style="width: 310px">
        <template v-if="isMobile">
          <dark-button
            class="mx-2"
            icon
            small
            color="primary"
            href="https://github.com/jack-givens"
            target="_blank"
          >
            <v-icon>mdi-github</v-icon>
          </dark-button>
          <dark-button
            class="mr-2"
            icon
            small
            color="primary"
            href="https://www.linkedin.com/in/jack-givens-a531a5163/"
            target="_blank"
          >
            <v-icon>mdi-linkedin</v-icon>
          </dark-button>
        </template>
        <!-- <dark-button v-else color="primary" rounded>
          <v-icon left>mdi-download</v-icon>
          Resume
        </dark-button> -->
      </div>

      <v-tabs v-if="!isMobile" centered class="ml-n9">
        <v-tab
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          :href="route.href"
          :target="route.href && '_blank'"
        >
          {{ route.name }}
          <v-icon v-if="route.href" small right>mdi-open-in-new</v-icon>
        </v-tab>
      </v-tabs>
      <v-spacer />
      <material-you-picker />
      <dark-button
        color="primary"
        rounded
        href="mailto:jack.w.givens@gmail.com"
        target="_blank"
      >
        Contact Me
      </dark-button>
    </v-app-bar>

    <v-main :class="mainClass">
      <router-view />
    </v-main>
    <v-bottom-navigation v-if="isMobile" app color="primary">
      <v-btn v-for="route in routes" :key="route.name" :to="route.path">
        <span>{{ route.name }}</span>
        <v-icon>{{ route.meta.icon }}</v-icon>
      </v-btn>
      <!-- <v-btn
        href="https://www.linkedin.com/in/jack-givens-a531a5163/"
        target="_blank"
      >
        <span>Resume</span>
        <v-icon>mdi-download</v-icon>
      </v-btn> -->
    </v-bottom-navigation>
    <v-footer v-else padless fixed color="rgba(0,0,0,0)" app>
      <div class="d-flex pb-6 pl-3">
        <dark-button
          class="mx-2"
          fab
          small
          color="primary"
          href="https://github.com/H-V-N"
          target="_blank"
        >
          <v-icon>mdi-github</v-icon>
        </dark-button>
        <dark-button
          class="mx-2"
          fab
          small
          color="primary"
          href="https://www.linkedin.com/in/jack-givens-a531a5163/"
          target="_blank"
        >
          <v-icon>mdi-linkedin</v-icon>
        </dark-button>
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { routes } from './router';
export default Vue.extend({
  data: () => ({
    routes
  }),
  computed: {
    mainClass() {
      return {
        'bg-img': this.$route.name === 'Home',
        [`img-${this.$vuetify.breakpoint.name}`]: true
      };
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  }
});
</script>

<style lang="sass" scoped>

.bg-img
  background-image: url('./assets/headshot.png')
  background-size: 63vh
  background-position: bottom

  &.img-md,
  &.img-sm
    background-position: bottom right

  &.img-xs
    background-size: auto 55%
</style>
