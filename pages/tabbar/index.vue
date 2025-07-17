<template>
  <div v-if="openedTabs.length > 0" class="flex-initial flex justify-content-start">
    <button v-for="t in openedTabs" :key="t.order" class="flex-initial tab" @click="requestChangeMenu(t)">
      {{ t.menu.name }} <i class="pi pi-times-circle tab-close-icon" @click.stop="closeTab(t)"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'
import { useTabStore } from '~/stores/tab'
const menuStore = useMenuStore()
const tabStore = useTabStore()
const router = useRouter()
const openedTabs = computed(() => tabStore.openedTabs)

const requestChangeMenu = (tab:Tab) => {
  console.log('tabs > requestChangeMenu: ', tab.menu.id)
  tabStore.select(tab)
  menuStore.select(tab.menu)
  router.push(tab.menu.path)
}

const closeTab = (tab:Tab) => {
  tabStore.remove(tab)
  let path = '/'
  console.log('tabbar > isRemoveAll: ', tabStore.isRemoveAll)
  if (!tabStore.isRemoveAll) {
    path = openedTabs.value[0].menu.path
  }
  router.push(path)
}
</script>

<style lang="css" scoped>
.tab {
  background: white;
  border-radius: 2px;
  border: 1px;
  border-style: solid;
  border-color: black;
}
.tab:hover {
  color: white;
  background: black;
}
.tab-close-icon:hover {
  transition: all 1s;
  transform: rotate(360deg);
}
</style>