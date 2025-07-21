<template>
  <div class="sidebar-container">
    <div
      class="toggle-collapse"
    >
      <span class="toggle-collapse-text" @click="toggleAllCategories(false)">접기</span>
      <span>&nbsp;/&nbsp;</span>
      <span class="toggle-collapse-text" @click="toggleAllCategories(true)">펼치기</span>
    </div>
    <div
      class="sidebar-menus"
    >
      <div
        v-for="m in menus"
        :key="m.id"
        :class="[
          m.depth === 0 ? 'category' : 'subcategory',
          isCategoryCollapsed(m.parentId) ? 'collapsed' : ''
        ]"
        @click="m.depth === 0 && m.path === '' ? toggleCategoryCollapse(m.id) : requestChangeMenu(m)"
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
const collapsedCategories = ref<string[]>([])
const menuStore = useMenuStore()
const menus = computed(() => menuStore.menus)

const toggleAllCategories = (isExpanding: boolean) => {
  if (isExpanding) {
    collapsedCategories.value = []
  } else {
    menus.value.forEach(m => {
      if (!collapsedCategories.value.includes(m.id)) {
        collapsedCategories.value.push(m.id)
      }
    })
  }
}
const isCategoryCollapsed = (id: string) => {
  return collapsedCategories.value.includes(id)
}
const toggleCategoryCollapse = (id: string) => {
  console.log("toggle category collase. parentId: ", id)
  if (collapsedCategories.value.includes(id)) {
    collapsedCategories.value = collapsedCategories.value.filter(c => c !== id)
  } else {
    collapsedCategories.value.push(id)
  }
  console.log("toggle value to: ", collapsedCategories.value.includes(id))
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
.sidebar-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 12px;
  min-width: 0;
  transition: width 1s, padding 1s;
}
.toggle-collapse {
  width: 100%;
  height: fit-content;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  color: white;
  font-size: 14px;
  font-weight: 500;
}
.toggle-collapse-text:hover {
  color: darkblue;
  cursor: pointer;
}
.sidebar-menus {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
.category {
  width: 100%;
  height: fit-content;
  white-space: nowrap;
  min-width: 0;
  margin-top: 4px;
  margin-bottom: 8px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  color: whitesmoke;
  text-align: left;
  vertical-align: middle;
}
.category:hover {
  color: darkblue;
  cursor: pointer;
}
.subcategory {
  width: 100%;
  height: 20px;
  white-space: nowrap;
  min-width: 0;
  padding-left: 12px;
  padding-bottom: 8px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 400;
  color: whitesmoke;
  text-align: left;
  vertical-align: middle;
  transition: height 0.5s, padding-bottom 0.5s;
}
.subcategory:hover {
  color: darkblue;
  cursor: pointer;
}
.collapsed {
  height: 0;
  padding-bottom: 0;
  transition: height 0.5s, padding-bottom 0.5s;
}
</style>