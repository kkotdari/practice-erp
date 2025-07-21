import { type Menu } from '~/stores/menu'

export interface Tab{
  order: number,
  menu: Menu,
  isCurrent: Boolean,
}

export const useTabStore = defineStore('tabs', () => {
  // 현재 보이는 탭 목록
  const openedTabs = ref<Tab[]>([])
  const isRemoveAll = ref<Boolean>(false);
  // 탭 추가
  const add = (tab: Tab) => {
    const isTabExists = openedTabs.value.filter(t => t.menu.id === tab.menu.id).length > 0
    if (isTabExists) {
      return
    }

    tab.order = openedTabs.value.length
    openedTabs.value.push(tab)
    console.log('tabStore > add > opened tabs length(after): ', openedTabs.value.length)
  }
  // 탭 제거
  const remove = (tab: Tab) => {
    console.log('tabStore > remove: ', tab.menu.id)
    console.log('tabStore > remove > opened tabs length(before): ', openedTabs.value.length)
    openedTabs.value = openedTabs.value.filter((t) => t.menu.id !== tab.menu.id)
    console.log('tabStore > remove > opened tabs length(after): ', openedTabs.value.length)
    openedTabs.value.forEach((t) => {
      if (t.order > tab.order) {
        t.order = t.order - 1
      }
    })
    // 전체 페이지가 종료됐을 떄 그것을 알리기 위해 선언함.
    isRemoveAll.value = openedTabs.value.length === 0
    console.log('tabStore > isRemoveAll: ', isRemoveAll.value)
  }
  // 탭의 isCurrent 속성을 true로 바꿔줌
  const select = (tab: Tab | null) => {
    if (tab === null) {
      openedTabs.value.forEach(t => {
        t.isCurrent = false
      })
      return
    }
    openedTabs.value.forEach((t) => {
      if (t.menu.id === tab.menu.id) {
        t.isCurrent = true
      } else {
        t.isCurrent = false
      }
    })
  }

  const resetRemoveAll = () => {
    isRemoveAll.value = false;
  }

  return {
    openedTabs,
    isRemoveAll,
    add,
    remove,
    select,
    resetRemoveAll,
  }
})