import { defineStore } from "pinia";
import { type Menu, useMenuStore } from "~/stores/menu";

export interface Tab{
  order: number,
  menu: Menu,
}

export const useTabStore = defineStore('tabs', () => {
  const menuStore = useMenuStore()
  // 현재 보이는 탭 목록
  const openedTabs = ref<Tab[]>([])
  // 탭 추가
  const add = (menu:Menu) => {
    console.log('add tab: ', menu.id)
    const isTabExists = openedTabs.value.filter((t) => t.menu.id === menu.id).length > 0
    console.log('isTabExists: ', isTabExists)
    if (isTabExists) {
      console
      return
    }

    const newTab = {
      order: openedTabs.value.length,
      menu: menu,
    }
    openedTabs.value.push(newTab)
    select(newTab.menu)
  }
  // 탭 제거
  const remove = (tab:Tab) => {
    openedTabs.value = openedTabs.value.filter((t) => t.menu.id !== tab.menu.id)
    openedTabs.value.forEach((t) => {
      if (t.order > tab.order) {
        t.order = t.order - 1
      }
    })
    if (openedTabs.value.length > 0) { 
      select(openedTabs.value[0].menu)
    } else {
      select(menuStore.menus[0])
    }
  }
  // 탭의 url로 이동
  const select = (menu:Menu) => {
    menuStore.go(menu)
  }

  return {
    openedTabs,
    add,
    remove,
    select,
  }
})