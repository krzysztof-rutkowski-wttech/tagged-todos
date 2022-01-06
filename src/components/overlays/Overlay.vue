<script lang="ts">
import { watch, ref, defineComponent } from 'vue'
import { store } from '@/store'
import { Overlay } from '@/store/store.types'

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

<style lang="scss" scoped>
@import '@styles/colours.scss';

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $overlay-container-background;
}
nav {
  ul {
    list-style-type: none;
    display: flex;
    column-gap: 0.25rem;
    font-weight: 600;
    background-color: $overlay-background;
    margin: 0;
    padding: 0;
    li {
      padding: 1rem 0;
      a {
        text-decoration: none;
        color: $overlay-back-icon;
        padding: 0 1.25rem;
        margin: 0;
        cursor: pointer;
      }
    }
  }
}
.title {
  color: $overlay-color;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  margin-right: 3.5rem;
}
.content {
  background-color: $overlay-container-background;
}
</style>