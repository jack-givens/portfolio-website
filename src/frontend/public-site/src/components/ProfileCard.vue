<template>
  <v-card>
    <div :class="classes">
      <v-avatar :size="avatarSize" class="secondary">
        <v-img :src="avatar" />
      </v-avatar>
      <div class="flex-shrink-0">
        <v-card-title>{{ name }}</v-card-title>
        <v-card-subtitle>{{ title }}</v-card-subtitle>
      </div>
      <v-divider v-if="horizontal" vertical class="my-3" />
      <div class="details">
        <v-divider v-if="!horizontal" />
        <v-list-item>
          <v-icon color="accent" left>mdi-calendar</v-icon>
          <v-list-item-content>
            <v-list-item-title>{{ experience }}</v-list-item-title>
            <v-list-item-subtitle>Years of Experience</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon color="accent" left>mdi-school</v-icon>
          <v-list-item-content>
            <v-list-item-title style="white-space: normal; min-width: 130px">
              {{ education }}
            </v-list-item-title>
            <v-list-item-subtitle>Education</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon color="accent" left>mdi-briefcase</v-icon>
          <v-list-item-content>
            <v-list-item-title>{{ employer }}</v-list-item-title>
            <v-list-item-subtitle>Current Employer</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
export default Vue.extend({
  props: ['avatar', 'name', 'title', 'employer', 'education', 'experience'],
  data: () => ({
    observer: null as null | ResizeObserver,
    horizontal: false
  }),
  computed: {
    avatarSize(): number {
      return this.horizontal ? 72 : 96;
    },
    classes(): Record<string, boolean> {
      return {
        profile: true,
        'profile-horizontal': this.horizontal
      };
    }
  },
  mounted() {
    this.setHorizontal(this.$el.getClientRects()[0]);
    this.observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      this.setHorizontal(entries[0].contentRect);
    });
    this.observer.observe(this.$el);
  },
  beforeDestroy() {
    this.observer?.unobserve(this.$el);
  },
  methods: {
    setHorizontal({ width }: Partial<DOMRectReadOnly>) {
      this.horizontal = (width ?? 501) > 500;
    }
  }
});
</script>
<style lang="sass" scoped>
.profile::v-deep
  .v-list-item
    flex: 0 0

.profile
  display: flex
  align-items: center

  &-horizontal
    flex-direction: row
    padding-left: 16px
    > .details
      flex-direction: row
      flex-grow: 1
      align-items: center

  &:not(.profile-horizontal)
    flex-direction: column
    padding-top: 16px
    > .details
      flex-direction: column

.details
  display: flex
  flex-wrap: wrap
</style>
