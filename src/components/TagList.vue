<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { store } from '@/store'
import { Tag, TagNode } from '@/store/store.types'
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs.vue'

export default defineComponent({
  components: { Breadcrumbs },
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
        : currentNode.value.tags
            .map( ({ tagId }) => store.state.tags.find(tag => tag.id === tagId) )
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

    const choose = (tag: Tag) => {
      if (hasChildren(tag)) path.value.push(tag)
    }

    const edit = (tag: Tag) => {
      console.log(tag)
    }

    const breadcrumbItems = computed(() => path.value
      .map( ({ id, name }) => ({ key: id, label: name }) ))

    return {
      list,
      hasChildren,
      choose,
      edit,
      breadcrumbItems,
    }
  },
})
</script>

<template>
  <breadcrumbs :items="breadcrumbItems" />
  <ul class="list">
      <li v-for="tag in list" :key="tag.id">
          <div class='line-1' :class="[ hasChildren(tag) && 'has-children' ]">
              <div class="name" @click="choose(tag)">{{ tag.name }}</div>
              <button class="btn-right" @click="edit(tag)">
                  <icon icon="trash-alt" size="2x" />
              </button>
          </div>
          <div v-if="tag.description" class='line-2'>{{ tag.description }}</div>
      </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

  ul.list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
  }

  .list {
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
      margin: 0 1rem;
      font-size: 1.75rem;
      align-self: center;
      padding-left: .75rem;
    }
    button {
      width: 7rem;
      padding: 1.25rem 3rem;
      cursor: pointer;
      border-radius: 2rem;
      font-size: .875rem;
      font-weight: 600;
      box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

      &.btn-right {
        background-color: $side-button-background-2;
        color: $side-button-color-2;
        border: 1px solid $side-button-border-color-2;
        margin-right: -3rem;
        text-align: left;
        padding-left: 1.75rem;
        font-size: 0.75rem;
      }
    }
  }
</style>