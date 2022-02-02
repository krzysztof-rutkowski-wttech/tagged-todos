<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { store } from '@/store'
import { Tag, TagType, TagNode } from '@/store/store.types'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import SideButton from '@/components/SideButton.vue'
import List from '@/components/List.vue'

const emptyTag: Tag = {
  id: '',
  name: '',
  type: TagType.EMPTY,
}

export default defineComponent({
  components: {
    Breadcrumbs,
    SideButton,
    List,
  },
  emits: ['onChangeSelection'],
  props: {
    readOnly: {
      type: Boolean,
      required: false,
    },
  },
  setup(_, { emit }) {
    const path = ref<Tag[]>([])
    const currentNode = computed(() => {
      let current: TagNode | undefined = store.state.tagTree[0]

      path.value.forEach( ({ id }) => {
        current = current?.tags?.find(tagNode => tagNode.tagId === id)
        if (!current) return []
      } )

      return current
    })
    const selectedTag = ref<Tag>()

    const list = computed(() => {
      return !currentNode.value?.tags
        ? []
        : currentNode.value.tags!
            .map( ({ tagId }) => store.state.tags.find(tag => tag.id === tagId)! )
            .filter( tag => tag !== undefined )
            .sort( (a, b) => {
              if (a.name == b.name) return 0
              if (a.name > b.name) return 1
              return -1
            } )
    })

    const hasChildren = (tag: Tag) => {
      const selectedNode = currentNode.value.tags?.find( ({tagId}) => tagId === tag.id )

      return !!selectedNode?.tags?.length
    }

    const select = (tag: Tag) => {
      if (hasChildren(tag)) {
        path.value.push(tag)
        selectedTag.value = emptyTag
        emit('onChangeSelection', emptyTag)
        // store.commit(MutationTypes.setSelectedTag, emptyTag)
      }
    }

    const edit = (mouseEvent: MouseEvent, tag: Tag) => {
      console.log('edit tag', tag)
    }

    const breadcrumbItems = computed(() => path.value
      .map( ({ id, name }) => ({ key: id, label: name }) ))

    const selectHandler = (tag: Tag) => {
      console.log('selectHandler', tag)
      selectedTag.value = tag
      emit('onChangeSelection', tag)
      // store.commit(MutationTypes.setSelectedTag, tag)
    }

    const deselectHandler = (tag: Tag) => {
      console.log('deselectHandler', tag)
      selectedTag.value = emptyTag
      emit('onChangeSelection', emptyTag)
      // store.commit(MutationTypes.setSelectedTag, emptyTag)
    }


    return {
      list,
      hasChildren,
      edit,
      select,
      breadcrumbItems,
      selectHandler,
      deselectHandler,
    }
  },
})
</script>

<template>
  <breadcrumbs class="position-fixed" :items="breadcrumbItems" />
  <list 
    :list="list"
    key-prop="id"
    label-prop="name"
    @select="selectHandler"
    @deselect="deselectHandler"
    @dbClick="select"
  >
  </list>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

.position-fixed {
  position: fixed;
}

ul.list {
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-top: 2.8rem;
  margin: 0;
  font-size: 1.25rem;
}

.list {
  cursor: pointer;
  li {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid $list-item-divider;
    &:first-child {
      border-top: 1px solid $list-item-divider;
    }
  }
  .line-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 300;

    &.has-children {
      font-weight: 600;
    }
  }
  .line-2 {
    margin-top: 1rem;
  }
  .name {
    flex-grow: 1;
    margin: 0 .5rem;
    font-size: 1.75rem;
    align-self: center;
  }
}
</style>