<template>
    <div id="overlay-view" />
    <div v-show="!isDisplayed">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { watch, ref, defineComponent } from 'vue'
import { store } from '@/store'
import { Overlay } from '@/store/store.types'

export default defineComponent({
  setup() {
    const isDisplayed = ref<boolean>(false)

    watch(() => store.state.overlays, (overlays: Overlay[]) => {
      isDisplayed.value = !!overlays.length;
    });
    
    return {
        isDisplayed,
    }
  }
})
</script>

<style>
</style>