<template>
  <base-container :class="containerClass">
    <v-row>
      <v-col cols="10" sm="5" class="d-flex flex-column text-h1 primary--text">
        <div>Jack</div>
        <div>Givens</div>
      </v-col>
      <v-spacer />
      <v-col cols="12" lg="4" class="d-flex flex-column justify-center">
        <div class="d-flex align-end overflow-x-visible">
          <div class="text-h6 text-no-wrap">Hi, I'm an experienced</div>
          <v-slide-y-transition leave-absolute hide-on-leave>
            <div style="width: 180px" class="flex-grow-1" :key="currentRole">
              <dark-chip color="accent" class="ml-2">
                {{ roles[currentRole] }}
              </dark-chip>
            </div>
          </v-slide-y-transition>
        </div>
        <span class="text-h6">who loves bringing code to life</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" sm="4">
        <dark-button color="secondary" to="About">
          About Me
          <v-icon right dark>mdi-arrow-right</v-icon>
        </dark-button>
      </v-col>
    </v-row>
    <v-spacer />
  </base-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  data: () => ({
    roles: [
      'Software Engineer',
      'UI/UX Designer',
      'Systems Architect',
      'Technical Writer',
      'DevOps Engineer',
      'Team Lead',
      'Full-Stack Developer',
      'Project Manager',
      'Database Admin'
    ],
    currentRole: 0
  }),
  computed: {
    containerClass(): Record<string, boolean> {
      const active = this.$vuetify.breakpoint.lgAndUp;
      return {
        'fill-height': active,
        'align-start': active
      };
    }
  },
  mounted() {
    setInterval(() => this.nextRole(), 2000);
  },
  methods: {
    nextRole() {
      if (this.currentRole === this.roles.length - 1) {
        this.currentRole = 0;
      } else {
        this.currentRole++;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.text-h1 {
  font-weight: 500;
}
</style>
