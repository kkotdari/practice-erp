export interface Menu{
  parentId: string,
  order: number,
  id: string,
  name: string,
  path: string,
  subs: Menu[],
}

export const useMenuStore = defineStore('menus', () => {
  const menus = ref<Menu[]>([
    {
      parentId: '',
      order: 1,
      id: 'data',
      name: '데이터',
      path: '',
      subs: [
        {
          parentId: 'data',
          order: 1,
          id: 'table',
          name: '테이블',
          path: 'table',
          subs: [],
        },
        {
          parentId: 'data',
          order: 2,
          id: 'chart',
          name: '차트',
          path: 'chart',
          subs: [],
        },
      ],
    },
    {
      parentId: '',
      order: 2,
      id: 'community',
      name: '커뮤니티',
      path: '',
      subs: [
        {
          parentId: 'community',
          order: 1,
          id: 'members',
          name: '회원관리',
          path: 'members',
          subs: [],
        },
        {
          parentId: 'community',
          order: 2,
          id: 'board',
          name: '게시판',
          path: 'board',
          subs: [],
        },
      ],
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