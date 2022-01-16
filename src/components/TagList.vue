<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { store } from '@/store'
import { Tag, TagNode } from '@/store/store.types'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import SideButton from '@/components/SideButton.vue'

export default defineComponent({
  components: { Breadcrumbs, SideButton },
  props: {
    readOnly: {
      type: Boolean,
      required: false,
    },
    onChoose: {
      type: Function as PropType<(tag: Tag | undefined) => void>,
      required: false,
    },
  },
  setup() {
    const path = ref<Tag[]>([])
    const currentNode = computed(() => {
      let current: TagNode | undefined = store.state.tagTree[0]

      path.value.forEach( ({ id }) => {
        current = current?.tags?.find(tagNode => tagNode.tagId === id)
        if (!current) return []
      } )

      return current
    })

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
      if (hasChildren(tag)) path.value.push(tag)
    }

    const edit = (mouseEvent: MouseEvent, tag: Tag) => {
      console.log('edit tag', tag)
    }

    const breadcrumbItems = computed(() => path.value
      .map( ({ id, name }) => ({ key: id, label: name }) ))

    return {
      list,
      hasChildren,
      edit,
      select,
      breadcrumbItems,
    }
  },
})
</script>

<template>
  <breadcrumbs class="position-fixed" :items="breadcrumbItems" />
  <ul class="list">
      <li v-for="tag in list" :key="tag.id" @click="select(tag)">
          <div class='line-1' :class="[ hasChildren(tag) && 'has-children' ]">
              <div class="name">{{ tag.name }}</div>
              <side-button v-if="!readOnly" right color-secondary :onClick="(mouseEvent) => edit(mouseEvent, tag)">
                  <icon icon="edit" size="2x" />
              </side-button>
              <side-button v-if="readOnly" right color-primary :onClick="() => onChoose && onChoose(tag)">
                  <icon icon="check-circle" size="2x" />
              </side-button>
          </div>
          <div v-if="tag.description" class='line-2'>{{ tag.description }}</div>
      </li>
  </ul>
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