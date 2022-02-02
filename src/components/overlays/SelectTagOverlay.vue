<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import Overlay, { useOverlay } from '@/components/overlays/Overlay.vue'
import TagList from '@/components/tagList.vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'
import ActionButtonItem from '@/components/ActionButtonItem.vue'
import { TagType } from '@/services/model.types'
import { Tag } from '@/store/store.types'

export default defineComponent({
    inheritAttrs: false,
    props: [ 'title' ],
    emits: [ 'onChoose' ],
    components: { Overlay, TagList, ActionButton, ActionButtonType, ActionButtonItem },
    setup(_, { emit }) {
        const selectedTag = ref<Tag>()
        const isSelected = computed(() => selectedTag.value && selectedTag.value.type !== TagType.EMPTY)
        const handleChangeSelection = (tag: Tag) => selectedTag.value = tag
        const selectTag = () => isSelected.value && emit('onChoose', selectedTag.value)

        return {
            ActionButtonType,
            selectTag,
            handleChangeSelection,
            isSelected,
        }
    }
});

export const useSelectTagOverlay = () => {
    return useOverlay('select-tag-overlay')
}
</script>

<template>
    <overlay id="select-tag-overlay" :title="title">
        <tag-list @onChangeSelection="handleChangeSelection"/>
        <action-button :type="ActionButtonType.BOTTOM">
            <action-button-item @click="selectTag" v-show="isSelected">
                <icon icon="check-circle" size="2x" />
            </action-button-item>
        </action-button>
    </overlay>
</template>
