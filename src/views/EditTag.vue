<template>
  <h1>Edit tag - {{ tag.name }}</h1>
  <div>tag id: {{ tag.id }}</div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
// import { useStore } from 'vuex'
import { store } from '../store'

export default {
  setup() {
    const route = useRoute();
    // const store = useStore();  // Don't know why it returns undefined
    const tagId = route.params.tagId;
    const tag = store.getters.getTagById(tagId)

    return {
      tag
    }
  },
}
</script>

