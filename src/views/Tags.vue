<script lang="ts">
import {ref } from 'vue'
import { store } from '@/store'
import TagList from '@/components/TagList.vue'
import NavBar from '@/components/NavBar.vue'
import AddTagOverlay, { useAddTagOverlay } from '@/components/overlays/AddTagOverlay.vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'

export default {
  components: { TagList, NavBar, ActionButton, AddTagOverlay },
  setup() {
    const tags = ref(store.state.tags)
    const [ openAddTagOverlay, closeAddTagOverlay ] = useAddTagOverlay();
    
    const handleAddedTag = () => {
      closeAddTagOverlay()
    }

    return {
      tags,
      openAddTagOverlay,
      handleAddedTag,
      ActionButtonType,
    }
  },
}
</script>

<template>
  <NavBar>
    <tag-list />
    <action-button label="Add Todo item" :type="ActionButtonType.BOTTOM" @click="openAddTagOverlay" />
    <add-tag-overlay title="Add a new tag" @onAdded="handleAddedTag" />
  </NavBar>
</template>
