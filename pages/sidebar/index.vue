<template>
  <div
    class="sidebar-menus"
  >
    <div
      v-for="m in menus"
      :key="m.id"
      class="sidebar-menu"
      @click="requestChangeMenu(m)"
    >
      {{ m.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Menu, useMenuStore } from '~/stores/menu'
import { type Tab, useTabStore } from '~/stores/tab'

const router = useRouter()

const menuStore = useMenuStore()
const menus = computed(() => menuStore.menus)

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
.sidebar-menus {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 12px;
  left: 12px;
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 8px;
  align-items: start;
  transition: width 1s, padding 1s;
}
.sidebar-menu {
  width: 100%;
  height: fit-content;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  vertical-align: middle;
  cursor: pointer;
}
</style>