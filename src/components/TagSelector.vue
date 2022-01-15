<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'
import SelectTagOverlay, { useSelectTagOverlay } from '@/components/overlays/SelectTagOverlay.vue'
import { store } from '@/store'
import { Tag } from '@/store/store.types'

export default defineComponent({
  components: { ActionButton, SelectTagOverlay },
  setup() {
    const [ openSelectTagOverlay, closeSelectTagOverlay ] = useSelectTagOverlay()
    const selectedTagName = ref<string | undefined>(store.state.selectedTag?.name)

    const handleTagSelected = (tag: Tag) => {
      store.commit('setSelectedTag', tag)
      closeSelectTagOverlay()
    }

    watch(() => store.state.selectedTag, () => selectedTagName.value = store.state.selectedTag?.name)

    return {
        ActionButtonType,
        openSelectTagOverlay,
        handleTagSelected,
        selectedTagName,
    }
  },
})
</script>

<template>
  <action-button 
    :class="{ 'tag-selected': selectedTagName }"
    :label="selectedTagName ?? 'Select tag...'"
    :type="ActionButtonType.TOP"
    @click="openSelectTagOverlay"
  />
  <select-tag-overlay title="Select tag" :onChoose="handleTagSelected" />
</template>

<style lang="scss" scoped>
  .tag-selected {
    font-weight: 600;
  }
</style>