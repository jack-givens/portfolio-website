<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <!--keeps tabs centered... kinda hacky-->
      <div style="width: 160px" />

      <v-tabs v-if="$vuetify.breakpoint.mdAndUp" centered class="ml-n9">
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
      <color-picker />
      <v-btn color="primary" rounded outlined>Hire Me</v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav>
        <v-list-item
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          :href="route.href"
          :target="route.href && '_blank'"
        >
          <v-list-item-title>{{ route.name }}</v-list-item-title>
          <v-list-item-icon v-if="route.href">
            <v-icon>mdi-open-in-new</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorPicker from './components/ColorPicker.vue';
import { routes } from './router';
export default Vue.extend({
  components: { ColorPicker },
  data: () => ({
    routes: [
      ...routes,
      {
        name: 'GitHub',
        href: 'https://github.com/H-V-N'
      }
    ],
    drawer: false
  })
});
</script>
