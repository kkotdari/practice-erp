import { useTabStore } from '~/stores/tab'

export interface Menu{
  depth: number,
  parentId: string,
  order: number,
  id: string,
  name: string,
  path: string,
}

export const useMenuStore = defineStore('menus', () => {
  const menus = ref<Menu[]>([
    {
      depth: 0,
      parentId: '',
      order: 1,
      id: 'dashboard',
      name: '대시보드',
      path: '/dashbard',
    },
    {
      depth: 0,
      parentId: '',
      order: 2,
      id: 'members',
      name: '회원관리',
      path: '/dashbard',
    },
    {
      depth: 0,
      parentId: '',
      order: 3,
      id: 'boards',
      name: '게시판',
      path: '/dashbard',
    },
  ])

  const currentMenu = ref<Menu>({
    depth: 0,
    parentId: '',
    order: 1,
    id: 'dashboard',
    name: '대시보드',
    path: '/dashbard',
  })
  
  const select = (menu:Menu) => {
    console.log("selected menuId: ", menu.id)
    const tabStore = useTabStore()
    currentMenu.value = menu
    tabStore.add(menu)
  }

  const go = (menu:Menu) => {
    currentMenu.value = menu
  }

  return {
    menus,
    currentMenu,
    select,
    go,
  }
})