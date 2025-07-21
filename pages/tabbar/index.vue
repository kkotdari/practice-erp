<template>
  <div
    v-if="openedTabs.length > 0"
    class="tabs"
  >
    <button
      v-for="t in openedTabs" :key="t.order"
      class="tab"
      @click="requestChangeMenu(t)"
    >
      <div
        class="tab-container"
        :class="t.isCurrent ? 'isCurrent': ''"
      >
        {{ t.menu.name }}
        <i
          class="tab-close-icon pi pi-times-circle"
          @click.stop="closeTab(t)"
        />
      </div>
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
  if (tabStore.isRemoveAll) {
    router.push('/')
  } else {
    menuStore.select(openedTabs.value[0].menu)
    tabStore.select(openedTabs.value[0])
    router.push(openedTabs.value[0].menu.path)
  }
}
</script>

<style lang="css" scoped>
.tabs {
  padding-left: 12px;
  display: flex;
  justify-content: start;
  align-items: end;
}
.tab {
  width: fit-content;
  height: fit-content;
  padding: 0;
  overflow: hidden;
  gap: 4px;
  text-align: center;
  vertical-align: bottom;
  background: white;
  border-radius: 2px 2px 0px 0px;
  border: none;
  cursor: pointer;
}
.tab:hover {
  color: darkblue;
}
.tab-container {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 6px 10px 8px 10px;
  font-size: 14px;
  font-weight: 600;
}
.tab-container::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 36px;
  background: radial-gradient(
    ellipse 40px 10px at center 36px,
    rgba(0,255,0,0.8) 0%,
    rgba(0,255,0,0.3) 10%,
    rgba(0,255,0,0.1) 50%,
    rgba(0,255,0,0) 100%
  ) no-repeat;
  background-size: 100% 100%;
  opacity: 0;
  transition: opacity 1s cubic-bezier(.075,.82,.165,1);
  pointer-events: none;
}
.tab-container.isCurrent::after {
  opacity: 1;
}
.tab-close-icon:hover {
  transition: all 1s;
  transform: rotate(360deg);
}
</style>