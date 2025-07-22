<template>
  <div
    v-if="openedTabs.length > 0"
    class="tabs"
  >
    <button
      v-for="(t, idx) in openedTabs" :key="idx"
      class="tab"
      draggable="true"
      @dragstart="onDragstart(idx)"
      @dragover.prevent="onDragover($event)"
      @dragleave.prevent="onDragleave($event)"
      @drop="onDrop($event, idx)"
      @click="requestChangeMenu(t)"
    >
      <div
        class="tab-container"
        :class="t.isCurrent ? 'isCurrent': ''"
      >
        <span class="tab-name">
          {{ t.menu.name }}
        </span>
        <i
          class="tab-close-icon pi pi-times"
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

let fromIdx: number

const onDragstart = (idx: number) => {
  console.log('tabbar > dragstart')
  fromIdx = idx
}

const onDragover = (e: DragEvent) => {
  console.log('tabbar > dragover')
  const targetTab = (e.currentTarget as Element)
  const rect = targetTab.getBoundingClientRect()
  const x = e.clientX - rect.left
  if (x < rect.width * 0.5) {
    targetTab?.classList.add('pushed')
  } else {
    targetTab?.classList.remove('pushed')
  }
}

const onDragleave = (e: DragEvent) => {
  console.log('tabbar > dragleave')
  const targetTab = (e.currentTarget as Element)
  targetTab?.classList.remove('pushed')
}

const onDrop = (e: DragEvent, idx: number) => {
  console.log('tabbar > drop')
  const targetTab = (e.currentTarget as Element)
  targetTab?.classList.remove('pushed')
  tabStore.move(fromIdx, idx)
}

const requestChangeMenu = (tab:Tab) => {
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
  height: 32px;
  padding: 0;
  margin: 0 0 0 12px;
}
.tab {
  width: fit-content;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background: white;
  border-radius: 2px 2px 0px 0px;
  border: none;
  transition: margin-left 0.5s;
}
.tab.pushed {
  margin-left: 32px; 
}
.tab-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 6px 10px 8px 10px;
}
.tab-container::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 32px;
  background: radial-gradient(
    ellipse 40px 10px at center 32px,
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
.tab-name {
  padding-top: 1px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: seagreen;
}
.tab-name:hover {
  color: darkblue;
  cursor: pointer;
}
.tab-close-icon {
  width: 14px;
  font-weight: 500;
  color: seagreen;
}
.tab-close-icon:hover {
  color: darkblue;
  cursor: pointer;
}
</style>