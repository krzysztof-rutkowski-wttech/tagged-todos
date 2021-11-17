<template>
  <h1>Edit tag - {{ tagId }}</h1>
  <div>{{ tag.name }}</div>
</template>

<script lang="ts">
import { store } from '../store'

export default {
  props: ["tagId"],
  computed: {
    tag: () => {
      // const id = this.$route.params.id;

      return store.getters.getTagById('tag-2');
    }
  },
}
</script>

