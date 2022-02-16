<template>
  <v-container style="max-width: 100%">
    <v-row justify="center">
      <v-col cols="12" sm="11" md="3" xl="2">
        <profile-card
          :avatar="require('../assets/headshot.png')"
          title="Senior Software Engineer"
          name="Jack Givens"
          experience="4+"
          education="B.S in Computer Science @ WGU"
          employer="Ayoka Systems"
        />
      </v-col>
      <v-col cols="10" md="6" xl="8" class="main-text">
        <v-subheader>Bio</v-subheader>
        <v-divider />
        <p>
          I'm a remote, full-stack software engineer based out of Fort Worth,
          TX. I have a passion for learning about programming, and improving my
          practices to be the best at what I do. My greatest satisfaction comes
          from creating elegant, seamless works in both underlying software
          architecture and surface-level user interfaces.
        </p>
        <v-subheader>Experience</v-subheader>
        <v-divider />
        <v-row>
          <v-col
            v-for="(item, index) in listItems"
            :key="index"
            cols="12"
            lg="4"
          >
            <bullet-list v-bind="item" />
          </v-col>
        </v-row>
        <div class="d-flex justify-space-between">
          <v-subheader>Knowledge</v-subheader>
          <div class="d-flex align-center">
            <dark-chip v-for="(k, i) in key" :key="i" :color="skillColor(k)">
              {{ k.name }}
            </dark-chip>
            <!-- <dark-chip color="primary">Language</dark-chip>
            <dark-chip color="secondary">Framework</dark-chip>
            <dark-chip color="accent">Technology</dark-chip> -->
          </div>
        </div>
        <!-- <v-subheader>Knowledge</v-subheader> -->
        <v-divider />
        <v-progress-linear indeterminate v-if="loading" />
        <p>
          <span class="mr-2">Experienced at:</span>
          <dark-chip
            v-for="(skill, index) in groupedSkills.learned"
            :key="index"
            :color="skillColor(skill)"
          >
            {{ skill.name }}
          </dark-chip>
        </p>
        <p>
          <span class="mr-2">Would like to learn more of:</span>
          <dark-chip
            v-for="(skill, index) in groupedSkills.unlearned"
            :key="index"
            :color="skillColor(skill)"
          >
            {{ skill.name }}
          </dark-chip>
        </p>

        <div class="d-flex flex-grow-1 justify-end">
          <dark-button color="secondary" to="Portfolio">
            View My Portfolio
            <v-icon right dark>mdi-arrow-right</v-icon>
          </dark-button>
        </div>
      </v-col>
      <v-col cols="0" md="3" xl="2" />
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Api } from '@/services';
import { Skill } from '@/services/skills';
import Vue from 'vue';
type GroupedSkills = Record<'learned' | 'unlearned', Skill[]>;
export default Vue.extend({
  data: () => ({
    listItems: [
      {
        title: 'Development',
        items: [
          'Architected and implemented scalable software solutions',
          'Developed frontend applications for web, mobile, and embedded systems',
          'Designed in-house code libraries to boost efficiency',
          'Led junior developers through code reviews and writing documentation'
        ]
      },
      {
        title: 'Management',
        items: [
          'Managed between 2 to 3 large-scale projects at any given time',
          'Interfaced between external stakeholders and internal developer teams',
          'Planned sprints to allocate resources appropriately and reduce blocks'
        ]
      },
      {
        title: 'Operations',
        items: [
          'Engineered CI/CD pipelines for many platforms',
          'Managed local development and production environments',
          'Set up observability across multiple types of workloads'
        ]
      }
    ],
    skills: [] as Skill[],
    key: [
      { type: 'language', name: 'Language' },
      { type: 'framework', name: 'Framework' },
      { type: 'technology', name: 'Technology' }
    ] as Skill[],
    loading: false
  }),
  computed: {
    groupedSkills(): GroupedSkills {
      return this.skills.reduce<GroupedSkills>(
        (res, curr) => {
          curr.wantToLearn ? res.unlearned.push(curr) : res.learned.push(curr);
          return res;
        },
        { learned: [], unlearned: [] }
      );
    }
  },
  beforeMount() {
    this.getSkills();
  },
  methods: {
    getSkills() {
      this.loading = true;
      Api.Skills.getSkills()
        .then((res) => (this.skills = res))
        .finally(() => (this.loading = false));
    },
    skillColor(skill: Skill) {
      switch (skill.type) {
        case 'language':
          return 'primary';
        case 'framework':
          return 'secondary';
        default:
          return 'accent';
      }
    }
  }
});
</script>

<style lang="sass" scoped>
.main-text
  max-width: 680px
  > p
    font-size: 1.2em

.v-chip
  margin-left: 2px
  margin-bottom: 1px
</style>
