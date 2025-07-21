<template>
  <div class="sidebar-container">
    <div
      class="toggle-collapse"
    >
      <span class="toggle-collapse-text" @click="toggleAllCategories(true)">펼치기</span>
      <span>&nbsp;/&nbsp;</span>
      <span class="toggle-collapse-text" @click="toggleAllCategories(false)">접기</span>
    </div>
    <div
      class="sidebar-menus"
    >
      <div
        v-for="m in menus"
        :key="m.id"
        class="category-family"
      >
        <div
          class="category"
          @click="m.subs.length === 0 && m.path !== '' ? requestChangeMenu(m) : toggleCategoryCollapse(m.id)"
        >
          {{ m.name }}
        </div>
        <div
          v-for="s in m.subs"
          :key="s.id"
          class="subcategory"
          :class="isCategoryCollapsed(s.parentId) ? 'collapsed' : ''"
          @click="s.path !== '' ? requestChangeMenu(s) : ''"
        >
          {{ s.name }}
        </div>
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
  width: 100%;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  transition: width 1s, padding 1s;
}
.toggle-collapse {
  width: 100%;
  height: fit-content;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
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
.category-family {
  width: 100%;
  height: auto;
}
.category {
  width: 100%;
  height: fit-content;
  padding: 8px 8px 8px 8px;
  font-size: 14px;
  font-weight: 600;
  background-color: white;
  color: darkgreen;
  text-align: left;
  vertical-align: middle;
}
.category:hover {
  color: darkblue;
  cursor: pointer;
}
.subcategory {
  width: 100%;
  height: 28px;
  min-height: 0;
  overflow: hidden;
  padding: 8px 8px 8px 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: mediumseagreen;
  color: whitesmoke;
  text-align: left;
  vertical-align: middle;
  transition: height 0.5s, padding-top 0.5s, padding-bottom 0.5s;
}
.subcategory:hover {
  color: darkblue;
  cursor: pointer;
}
.subcategory.collapsed {
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  transition: height 0.5s, padding-top 0.5s, padding-bottom 0.5s;
}
</style>