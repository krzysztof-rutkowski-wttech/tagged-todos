<script lang="ts">
import { defineComponent } from 'vue'
import Overlay, { useOverlay } from '@/components/overlays/Overlay.vue'

export default defineComponent({
    inheritAttrs: false,
    props: [ 'title', 'selectedTodoItem' ],
    components: { Overlay },
});

export const useAddTagOverlay = () => {
    return useOverlay('add-tag-overlay')
}
</script>

<template>
    <overlay id="add-tag-overlay" :title="title">
        <div>adding tag</div>
    </overlay>
</template>
