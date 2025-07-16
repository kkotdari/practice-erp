<template>
  <MyFlex
    v-show="isVisible"
    :style="{
      width: isVisible ? '200px' : '0',
      overflow: 'hidden',
      transition: 'width 0.5s cubic-bezier(.075,.82,.165,1)',
    }"
    style="height: 1600px;background-color: lightgoldenrodyellow;"
    class="flex-initial flex flex-column justify-content-start gap-2"
  >
    <button v-for="m in menus" :key="m.id" @click="requestChangeMenu(m)">
      {{ m.name }}
    </button>
  </MyFlex>
</template>

<script setup lang="ts">
import { type Menu, useMenuStore } from '~/stores/menu'
import { type Tab, useTabStore } from '~/stores/tab'

const router = useRouter()

defineProps({
  isVisible: Boolean,
})

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
  router.push(menu.path)
}
</script>