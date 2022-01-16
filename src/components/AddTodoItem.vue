<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { store } from '@/store'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'
import Button from '@/components/Button.vue'
import { Tag, TodoItem } from '@/store/store.types'
import SelectTagOverlay, { useSelectTagOverlay } from './overlays/SelectTagOverlay.vue'

type State = {
  todoItemName: string,
  todoItemDescr: string,
  errorMessages: string[],
}

export default defineComponent({
  components: { ActionButton, Button, SelectTagOverlay },
  emits: [ 'onAdded' ],
  setup(_,  { emit }) {
    const state: State = reactive({
      todoItemName: '',
      todoItemDescr: '',
      errorMessages: [],
    })
    const assignedTags = ref<Tag[]>([])

    const add = async () => {
      try {
        await store.dispatch('addTodoItem', {
          name: state.todoItemName,
          description: state.todoItemDescr,
          tags: assignedTags.value.map(tag => tag.id)
        })
        emit('onAdded')
      } catch (error) {
          state.errorMessages.push('Error storing a new todo item!')
          console.log(error)
      }
    }

    const preValidation = () => {
      let isError = false
      state.errorMessages = []
      if (state.todoItemName.trim() === '') {
        state.errorMessages.push('Title is empty. Please provide a title.')
        isError = true
      }
      if (!assignedTags.value.length) {
        state.errorMessages.push('Please assign at least one tag')
        isError = true
      }

      return !isError
    }

    const scrollToBottom = () => {
    }

    const handleAdd = () => {
      if (preValidation()) {
        add()
      }
    }

    const [ openSelectTagOverlay, closeSelectTagOverlay ] = useSelectTagOverlay()

    const handleAddTag = () => {
      openSelectTagOverlay()
    }

    const handleTagSelected = (tag: Tag) => {
      const tagIndex = assignedTags.value.findIndex(({id}) => id === tag.id)
      if (tagIndex < 0) {
        assignedTags.value.push(tag)
      }
      scrollToBottom()
      closeSelectTagOverlay()
    }

    const handleRemoveTag = (tag: Tag) => {
      const tagIndex = assignedTags.value.findIndex(({id}) => id === tag.id)
      if (tagIndex > -1) {
        assignedTags.value.splice(tagIndex, 1)
      }
    }

    return {
      ...toRefs(state),
      ActionButtonType,
      handleAdd,
      handleAddTag,
      handleTagSelected,
      handleRemoveTag,
      assignedTags,
    }
  },
})
</script>

<template>
  <form class="form">
    <div class="errorMessage" v-if="errorMessages.length">
      <div v-for="error in errorMessages" :key="error">{{ error }}</div>
    </div>
    <label for="todoItem-name">Title</label>
    <input type="text" id="todoItem-name" v-model="todoItemName" placeholder="enter title (required)"/>
    <label for="todoItem-description">Description</label>
    <textarea 
      id="todoItem-description" 
      maxlength="1024" 
      placeholder="provide description (optional)"
      v-model="todoItemDescr"
    />
    <label>Tags</label>
    <div class="tag" v-for="tag in assignedTags" :key="tag.id">
      <span>{{ tag.name }}</span>
      <span class="side-button" @click="() => handleRemoveTag(tag)"><icon icon="minus-circle" /></span>
    </div>
    <Button @click="handleAddTag">
      <span class="icon"><icon icon="plus-circle" /></span>
      <span>Assign tag</span>
    </Button>
  </form>
  <action-button label="Add" :type="ActionButtonType.BOTTOM" @click="handleAdd"/>
  <select-tag-overlay title="Select tag" :onChoose="handleTagSelected" />
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

.form {
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 10rem 2rem;

  label {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0.5rem 0;
    color: $input-label-color;
  }
  input {
    height: 3rem;
    font-size: 1.5rem;
    padding: 0 1rem;
    margin-bottom: 2rem;
    border: 1px solid $input-border-color;
    background-color: $input-background;
  }
  textarea#todoItem-description {
    margin-bottom: 2rem;
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    height: 10rem;
    border: 1px solid $input-border-color;
    background-color: $input-background;
    resize: none;
  }
  button {
    height: 2rem;
  }
  .errorMessage {
    color: $error-color;
    font-size: 1.25rem;
    font-weight: 600;
    height: 4rem;
    text-align: center;
  }

  .tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    background-color: $selected-tag-background;
    color: $selected-tag-color;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    .side-button {
      font-size: 2rem;
      padding: .5rem 1.25rem;
    }
  }

  .icon {
    font-size: 2rem;
  }
}
</style>
