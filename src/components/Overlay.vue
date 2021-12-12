<template>
  <teleport to="#overlay-view">
    <div class="overlay" v-if="isDisplayed">
      <nav>
        <ul>
          <li>
            <a @click="overlayClose"><icon icon="angle-left" size="2x" /></a>
          </li>
          <li class="title">
            <div>{{ title }}</div>
          </li>
        </ul>
      </nav>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { watch, ref, defineComponent } from 'vue'
import { store } from '../store'
import { Overlay } from '../store/store.types'

export default defineComponent({
  emits: [ 'close' ],
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  setup({ id, title }, { emit }) {
    const isDisplayed = ref<boolean>(false)

    watch(() => store.state.overlays, (overlays: Overlay[]) => {
      const overlay = overlays.find(o => o.overlayId === id)

      isDisplayed.value = !!overlay;
    });
    
    const overlayClose = () => {
      store.commit("removeOverlay", id)
      emit('close')
    };

    return {
      overlayClose,
      isDisplayed,
      title: title,
    }
  }
})

export const useOverlay = (overlayId: string) => {
  const open = (params?: Object) =>  store.commit("addOverlay", {
    overlayId,
    params,
  })
  const close = () => store.commit("removeOverlay", overlayId)

  return [ open, close ]
}

</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e5e8e9;
}
nav {
  ul {
    list-style-type: none;
    display: flex;
    column-gap: 0.25rem;
    font-weight: 600;
    background-color: #9fc1b8;
    margin: 0;
    padding: 0;
    li {
      padding: 1rem 0;
      a {
        text-decoration: none;
        color: #4C8577;
        padding: 0 1.25rem;
        margin: 0;
        cursor: pointer;
      }
    }
  }
}
.title {
  color: #4C8577;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  margin-right: 3.5rem;
}
.content {
  background-color: #D7DFE0;
}
</style>