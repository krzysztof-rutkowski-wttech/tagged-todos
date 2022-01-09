<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export interface BreadcrumbItem {
  label: string,
}

export default defineComponent({
  props: { items: Object as PropType<BreadcrumbItem[]> },
})
</script>

<template>
  <ul class="beadcrumbs">
    <template v-for="item in items" :key="item.label">
      <li>/</li>
      <li>{{ item.label }}</li>
    </template>
    <li v-if="!items?.length"> / </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

  ul.beadcrumbs {
    display: inline-flex;
    flex-direction: row;
    gap: 0.75rem;
    font-size: 1rem;
    list-style-type: none;
    padding: .75rem 1rem;
    margin: 0;
    background-color: $base-color-1-light;
    width: 100%;
    font-weight: 600;
    z-index: 1;
  }
</style>