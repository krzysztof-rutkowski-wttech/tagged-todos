<template>
  <action-button label="Select tag..." :type="ActionButtonType.TOP"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'

export default defineComponent({
  components: { ActionButton },
  setup() { 
    return {
        ActionButtonType
    }
  },
})
</script>

<style>
</style>
