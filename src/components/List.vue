<script lang="ts">
import { defineComponent, ref } from 'vue'
import { store } from '@/store'

export default defineComponent({
    props: {
      list: Object,
      keyProp: {
        type: String,
        required: true
      },
      labelProp: {
        type: String,
        required: true
      },
    },
    emits: [ 'select', 'deselect', 'dbClick' ],
    setup(props, { emit }) {
      const selectedItem = ref()

      const handleClick = (item: object) => {
        if (item !== selectedItem.value) {
          selectedItem.value = item
          emit('select', item)
        } else {
          selectedItem.value = undefined
          emit('deselect', item)
        }
      }

      const handleDoubleClick = (item: object) => {
        selectedItem.value = undefined
        emit('dbClick', item)
      }

      return {
        handleClick,
        handleDoubleClick,
        selectedItem,
        store,
      }
    },
})
</script>

<template>
  <ul class="list">
    <li
      v-for="item in list"
      :key="item[keyProp]"
      @click="() => handleClick(item)"
      @dblclick="() => handleDoubleClick(item)"
      :class="{ selected: selectedItem === item }"
    >
      <div class='line-1'>
        <div class="name">{{ item[labelProp] }}</div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

.list {
  &.ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
  }
  li {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid $list-item-divider;
    &:first-child {
      border-top: 1px solid $list-item-divider;
    }
    &.selected {
      background-color: $list-item-selected-background;
    }
    .line-1 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .line-2 {
      margin-top: 1rem;
    }
  }
}
</style>