<template>
  <Overlay id="edit-tag" :title="tag?.name" @close="handleClose">
    <h1>Edit tag - {{ tag?.name }}</h1>
    <div>tag id: {{ tag?.id }}</div>
  </Overlay>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'
import router from '../router'
import Overlay, { useOverlay } from '../components/Overlay.vue'

export default {
  components: { Overlay },
  setup() {
    const route = useRoute();
    const tagId = route.params.tagId;
    const tag = computed(() => store.getters.getTagById(tagId))

    const handleClose = () => {
      router.push({ name: 'tags' })
    }

    return {
      tag,
      handleClose,
    }
  },
  mounted() {
    const [ openOverlay ] = useOverlay('edit-tag')
    openOverlay()
  }
}
</script>

