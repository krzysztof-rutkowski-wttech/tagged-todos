<template>
  <!-- <ul>
    <li v-for="tag in list" :key="tag.id">
      <router-link :to="{ name: 'edit-tag', params: { tagId: tag.id } }"> {{ tag.name }}</router-link>
    </li>
  </ul> -->

  <ul class="list">
      <li v-for="tag in list" :key="tag.id">
          <div class='line-1'>
              <div class="name">{{ tag.name }}</div>
              <button class="btn-right" @click="edit(tag)">
                  <icon icon="trash-alt" size="2x" />
              </button>
          </div>
          <div v-if="tag.description" class='line-2'>{{ tag.description }}</div>
      </li>
  </ul>


</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { store } from '../store'
import { Tag } from '../store/store.types'

export default defineComponent({
  setup() {
    const list = ref<Tag[]>(store.state.tags);

    watch(() => store.state.tags, () => {
        list.value = store.state.tags
    });

    const edit = (tag: Tag) => {

    }

    return {
      list,
      edit,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

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