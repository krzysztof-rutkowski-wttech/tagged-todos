<template>
  <Overlay :title="tag?.name" returnPageName="tags">
    <h1>Edit tag - {{ tag?.name }}</h1>
    <div>tag id: {{ tag?.id }}</div>
  </Overlay>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'
import Overlay from '../components/Overlay.vue'

export default {
  components: { Overlay },
  setup() {
    const route = useRoute();
    const tagId = route.params.tagId;
    const tag = computed(() => store.getters.getTagById(tagId))

    return {
      tag
    }
  },
}
</script>

