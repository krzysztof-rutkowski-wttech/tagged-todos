<template>
  <NavBar />
  <tag-list />
  <action-button label="Add a new tag" :type="ActionButtonType.BOTTOM"/>
</template>

<script lang="ts">
import {ref } from 'vue'
import { store } from '../store'
import ActionButton, { ActionButtonType } from '../components/ActionButton.vue'
import TagList from '../components/TagList.vue'
import NavBar from '../components/NavBar.vue'

export default {
  components: { TagList, ActionButton, NavBar },
  setup() {
    const tags = ref(store.state.tags);
    return {
      tags,
      ActionButtonType
    }
  },
}
</script>