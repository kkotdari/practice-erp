<template>
  <div
    class="sidebar-wrapper flex flex-column"
    :class="[isVisible ? '' : 'sidebar-wrapper-collapsed']"
  >
    <i
      class="sidebar-control-button"
      :class="[isVisible ? 'pi pi-angle-double-left' : 'pi pi-angle-double-right']"
      @click="changeVisibility"
    />
    <div
      class="sidebar-menus flex flex-column justify-content-start align-items-start gap-2"
      :class="[isVisible ? '' : 'sidebar-menus-collapsed']"
    >
      <div
        v-for="m in menus"
        :key="m.id"
        class="sidebar-menu"
        :class="[isVisible ? '' : 'sidebar-menu-collapsed']"
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

const emit = defineEmits(['update'])

const router = useRouter()

const menuStore = useMenuStore()
const menus = computed(() => menuStore.menus)

const isVisible = ref(true)

const changeVisibility = () => {
  isVisible.value = !isVisible.value
  emit('update', isVisible.value)
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
  padding: 0;
  background-color:lightcyan;
  overflow: visible;
  transition: width 1s;
}
.sidebar-wrapper-collapsed {
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
  overflow: hidden;
  transition: width 1s, padding 1s;
}
.sidebar-menus-collapsed {
  width: 0;
  padding: 0;
}
.sidebar-menu {
  width: 100%;
  height: fit-content;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
  vertical-align: middle;
  cursor: pointer;
}
</style>