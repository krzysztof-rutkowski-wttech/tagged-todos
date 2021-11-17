<template>
  <h1>Tag list</h1>
  <ul>
    <li v-for="tag in tags" :key="tag.id">
      <router-link :to="{ name: 'edit-tag', params: { tagId: tag.id } }"> {{ tag.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { store } from '../store'

export default {
  computed: {
    tags: () => {
      return store.state.tags
    }
  },
}
</script>