<template>
  <div
    class="sidebar-wrapper"
    :style="{
      width: isVisible ? '200px' : '0'
    }"
  >
    <i class="sidebar-control-button" :class="isVisible ? 'pi pi-angle-double-left' : 'pi pi-angle-double-right'" @click="changeVisibility"/>
    <MyFlex
      v-if="isVisible"
      class="flex-initial flex flex-column justify-content-start gap-2"
      style="width: 100%; padding: 2px;"
    >
      <button v-for="m in menus" :key="m.id" style="text-align: center;vertical-align: middle;" @click="requestChangeMenu(m)">
        {{ m.name }}
      </button>
    </MyFlex>
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
  router.push(menu.path)
}
</script>

<style scoped>
.sidebar-wrapper {
  position: relative;
  overflow: visible;
  width: auto;
  height: 100%;
  transition: width 0.5s cubic-bezier(.075,.82,.165,1);
  background-color: transparent;
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
</style>