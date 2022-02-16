<template>
  <v-container class="mb-6">
    <v-row justify="center">
      <v-col justify="center" align="center" v-if="loading">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
      <v-col
        v-for="(project, index) in projects"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <v-card>
          <v-img :src="project.image" :aspect-ratio="16 / 9" />
          <v-card-title>{{ project.title }}</v-card-title>
          <v-card-subtitle>{{ project.subtitle }}</v-card-subtitle>
          <v-card-text>
            {{ project.description }}
          </v-card-text>
          <v-divider />
          <v-card-text>
            <v-chip-group column>
              <dark-chip
                v-for="(t, index) in project.tech"
                :key="index"
                color="accent"
              >
                {{ t }}
              </dark-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Project } from '../services/projects';
import { Api } from '../services';
export default Vue.extend({
  data: () => ({
    projects: [] as Project[],
    loading: false
  }),
  beforeMount() {
    this.getProjects();
  },
  methods: {
    getProjects() {
      this.loading = true;
      Api.Projects.getProjects()
        .then((res) => (this.projects = res))
        .finally(() => (this.loading = false));
    }
  }
});
</script>
