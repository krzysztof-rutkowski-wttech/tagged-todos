<script lang="ts">
import {computed, ref } from 'vue'
import { store } from '@/store'
import TagList from '@/components/TagList.vue'
import NavBar from '@/components/NavBar.vue'
import AddTagOverlay, { useAddTagOverlay } from '@/components/overlays/AddTagOverlay.vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'
import ActionButtonItem from '@/components/ActionButtonItem.vue'
import { Tag, TagType } from '@/store/store.types'

export default {
  components: { TagList, NavBar, ActionButton, ActionButtonItem, AddTagOverlay },
  setup() {
    const tags = ref(store.state.tags)
    const [ openAddTagOverlay, closeAddTagOverlay ] = useAddTagOverlay()
    const selectedTag = ref<Tag>()
    const isSelected = computed(() => selectedTag.value && selectedTag.value.type !== TagType.EMPTY)
    const handleChangeSelection = (tag: Tag) => selectedTag.value = tag

    
    const handleAddedTag = () => {
      closeAddTagOverlay()
    }

    const handleEditTag = () => {
      console.log('handleEditTag tag')
    }

    const editTag = () => {
      console.log('edit tag')
    }

    return {
      tags,
      isSelected,
      openAddTagOverlay,
      handleAddedTag,
      handleEditTag,
      editTag,
      ActionButtonType,
      handleChangeSelection,
    }
  },
}
</script>

<template>
  <nav-bar>
    <tag-list @onChangeSelection="handleChangeSelection" />
    <action-button :type="ActionButtonType.BOTTOM">
      <action-button-item @click="editTag" v-if="isSelected">
        <icon icon="edit" size="2x" />
      </action-button-item>
      <action-button-item @click="openAddTagOverlay">
        <icon icon="plus-circle" size="2x" />
      </action-button-item>
    </action-button>
    <add-tag-overlay title="Add a new tag" @onAdded="handleAddedTag" />
  </nav-bar>
</template>
