<script lang="ts">
import {ref } from 'vue'
import { store } from '@/store'
import TagList from '@/components/TagList.vue'
import NavBar from '@/components/NavBar.vue'
import AddTagOverlay, { useAddTagOverlay } from '@/components/overlays/AddTagOverlay.vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'
import ActionButtonItem from '@/components/ActionButtonItem.vue'

export default {
  components: { TagList, NavBar, ActionButton, ActionButtonItem, AddTagOverlay },
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
  <nav-bar>
    <tag-list />
    <action-button :type="ActionButtonType.BOTTOM">
      <action-button-item @click="openAddTagOverlay">
        <icon icon="plus-circle" size="2x" />
      </action-button-item>
    </action-button>
    <add-tag-overlay title="Add a new tag" @onAdded="handleAddedTag" />
  </nav-bar>
</template>
