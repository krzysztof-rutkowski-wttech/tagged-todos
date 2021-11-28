<template>
  <h1>Tag list</h1>
  <ul>
    <li v-for="tag in list" :key="tag.id">
      <router-link :to="{ name: 'edit-tag', params: { tagId: tag.id } }"> {{ tag.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { store } from '../store'
import { Tag } from '../store/store.types'

export default defineComponent({
  setup() {
    const list = ref<Tag[]>(store.state.tags);

    watch(() => store.state.tags, () => {
        list.value = store.state.tags
    });

 
    return {
      list,
    }
  },
})
</script>

<style>
</style>