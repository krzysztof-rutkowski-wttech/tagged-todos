<template>
  <action-button label="Select tag..." :type="ActionButtonType.TOP" @click="openSelectTagOverlay"/>
  <select-tag-overlay title="Select tag" @onSlected="handleTagSelected" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'
import SelectTagOverlay, { useSelectTagOverlay } from '@/components/overlays/SelectTagOverlay.vue'

export default defineComponent({
  components: { ActionButton, SelectTagOverlay },
  setup() {
    const [ openSelectTagOverlay, closeSelectTagOverlay ] = useSelectTagOverlay()

    const handleTagSelected = () => {
      closeSelectTagOverlay();
    }

    return {
        ActionButtonType,
        openSelectTagOverlay,
        handleTagSelected,
    }
  },
})
</script>

<style>
</style>
