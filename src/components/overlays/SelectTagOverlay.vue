<template>
    <Overlay id="select-tag-overlay" :title="title">
        <div>selecting tag</div>
    </Overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Overlay, { useOverlay } from '@/components/overlays/Overlay.vue'

export default defineComponent({
    inheritAttrs: false,
    props: [ 'title', 'selectedTag'],
    components: { Overlay },
});

export const useSelectTagOverlay = () => {
    return useOverlay('select-tag-overlay')
}
</script>

<style scoped>
</style>