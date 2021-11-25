<template>
  <action-button label="Select tag..." :type="ActionButtonType.TOP"/>
</template>

<script lang="ts">
import ActionButton, { ActionButtonType } from './ActionButton.vue'

export default {
  components: { ActionButton },
  setup() { 
    return {
        ActionButtonType
    }
  },
}
</script>

<style>
</style>
