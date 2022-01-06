<template>
    <Overlay id="select-tag-overlay" :title="title">
        <tag-list read-only/>
    </Overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Overlay, { useOverlay } from '@/components/overlays/Overlay.vue'
import TagList from '@/components/tagList.vue'

export default defineComponent({
    inheritAttrs: false,
    props: [ 'title', 'selectedTag' ],
    components: { Overlay, TagList },
});

export const useSelectTagOverlay = () => {
    return useOverlay('select-tag-overlay')
}
</script>
