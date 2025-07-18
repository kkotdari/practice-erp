<template>
  <div
    :class="[
      'sidebar-wrapper',
      isVisible ? '' : 'collapsed',
    ]"
  >
    <i
      :class="[
        'sidebar-control-button',
        isVisible ? 'pi pi-angle-double-left' : 'pi pi-angle-double-right'
      ]"
      @click="changeVisibility"
    />
    <div
      v-show="isVisible"
      :class="[
        'sidebar-menus'
      ]"
    >
      <div
        v-for="m in menus"
        v-show="isVisible"
        :key="m.id"
        class="sidebar-menu"
        @click="requestChangeMenu(m)"
      >
        {{ m.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Menu, useMenuStore } from '~/stores/menu'
import { type Tab, useTabStore } from '~/stores/tab'

const router = useRouter()

const menuStore = useMenuStore()
const menus = computed(() => menuStore.menus)

const isVisible = ref(true)

const changeVisibility = () => {
  isVisible.value = !isVisible.value
}

const requestChangeMenu = (menu:Menu) => {
  menuStore.select(menu)
  const tabStore = useTabStore()
  const tab: Tab = {
    order: 0,
    menu: menu,
    isCurrent: true,
  }
  tabStore.add(tab)
  tabStore.select(tab)
  router.push(menu.path)
}
</script>

<style scoped>
.sidebar-wrapper {
  position: relative;
  width: 160px;
  height: 100%;
  background-color:lightcyan;
  overflow: visible;
  transition: width 0.5s cubic-bezier(.075,.82,.165,1);
}
.collapsed {
  width: 0;
}
.sidebar-control-button {
  position: absolute;
  top: 0;
  left: 100%;
  margin-top: 2px;
  margin-left: 2px;
  background: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
}
.sidebar-menus {
  width: 100%;
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 8px;
}
.sidebar-menu {
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  vertical-align: middle;
}
</style>