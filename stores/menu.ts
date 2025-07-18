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
      path: 'dashboard',
    },
    {
      depth: 0,
      parentId: '',
      order: 2,
      id: 'chart',
      name: '차트',
      path: 'chart',
    },
    {
      depth: 0,
      parentId: '',
      order: 3,
      id: 'members',
      name: '회원관리',
      path: 'members',
    },
    {
      depth: 0,
      parentId: '',
      order: 4,
      id: 'board',
      name: '게시판',
      path: 'board',
    },
  ])
  
  const select = (menu:Menu) => {
    console.log("selected menuId: ", menu.id)
  }

  return {
    menus,
    select,
  }
})