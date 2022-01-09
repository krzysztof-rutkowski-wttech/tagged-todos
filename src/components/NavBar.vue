<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import useWindowResize from '@/utils/useResize'
import { useRoute, useRouter } from 'vue-router'

interface MenuItem {
  name: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { name: 'home', label: 'Home' },
  { name: 'todos', label: 'Todo list' },
  { name: 'tags', label: 'Tags' },
  { name: 'history', label: 'History' },
]

export default defineComponent({
  setup() {
    const { width } = useWindowResize()
    const route = useRoute()
    const router = useRouter()
    const menuCollapsed = ref<boolean>(true)
    const isMobile = computed(() => ((width.value ?? 0) <= 480))
    const currentOptionName = () => menuItems.find(option => option.name === route.name)?.label
    const toggleMenu = () => {
      menuCollapsed.value = !menuCollapsed.value
    }
    const onOptionClick = (menuItem: MenuItem) => router.push({ name: menuItem.name })

    return {
      isMobile,
      menuCollapsed,
      toggleMenu,
      onOptionClick,
      currentOptionName,
      menuItems,
    }
  }
})
</script>

<template>
  <div v-if="isMobile && !menuCollapsed" class="transparent" @click="toggleMenu"></div>
  <nav :class="{ mobile: isMobile, desktop: !isMobile }">
    <ul>
      <li v-if="isMobile" class="bars">
        <div class="menu-bars" @click="toggleMenu">
          <icon icon="bars" />
        </div>
        <div class="menu-title">
          {{ currentOptionName() }}
        </div>
      </li>
      <template v-if="!menuCollapsed || !isMobile">
        <li v-for="item in menuItems" :key="item.name" @click="() => onOptionClick(item)" :class="{ active: $route.name === item.name }">
          {{ item.label}}
        </li>
      </template>
    </ul>
  </nav>
  <div class="page-content">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

nav {
  position: fixed;
  top: 0;
  width: 100%;
  font-size: 1.125rem;
  z-index: 10;
  ul {
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;
    font-weight: 600;
  }

  &.desktop {
    ul {
      column-gap: 0.25rem;
      background-color: $nav-background;
      height: 4rem;
      li {
        padding: 1.25rem 1rem;
        text-decoration: none;
        color: $nav-color;
        cursor: pointer;
        &.active {
          background-color: $nav-background-selected;
          color: $nav-color-selected;
          padding: 1.25rem 1rem;
        }
      }
    }
  }
  &.mobile {
    ul {
      flex-direction: column;
      li {
        padding: 1.5rem 1rem;
        width: 100%;
        color: $nav-background;
        background-color: $base-color-1-light;
        border-bottom: 1px solid $nav-color;
        font-size: 1.5rem;
        text-decoration: none;
        &.active {
          color: $nav-background-selected;
        }
        &.bars {
          display: flex;
          padding: 0;
          color: $nav-color;
          background-color: $nav-background;
        }
        .menu-bars {
          padding: 1rem;
          color: $nav-color;
          z-index: 1;
        }
        .menu-title {
          padding: 1rem;
          background-color: $nav-background;
          width: 100%;
          text-align: center;
          margin-left: -3rem;
        }
      }
    }
  }
}

.transparent {
  position: fixed;
  background-color: #000;
  height: 100%;
  width: 100%;
  top: 0;
  margin: 0;
  padding: 0;
  opacity: .33;
  z-index: 5;
}
.page-content {
  margin: 4rem 0;
}
</style>