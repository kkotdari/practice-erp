<template>
  <div
    v-if="openedTabs.length > 0"
    class="tabs"
  >
    <button
      v-for="(t, idx) in openedTabs" :key="idx"
      class="tab"
      @click="requestChangeMenu(t)"
    >
      <div
        class="content"
        :class="t.isCurrent ? 'isCurrent': ''"
        name="content"
      >
        <span class="name">
          {{ t.menu.name }}
        </span>
        <i
          class="close-icon pi pi-times"
          @click.stop="closeTab(t)"
        />
      </div>
      <div
        class="drag-zone"
        draggable="true"
        @dragstart="onDragstart($event, idx)"
        @dragover.prevent="onDragover($event)"
        @dragleave.prevent="onDragleave($event)"
        @dragend="onDragend()"
        @drop="onDrop($event, idx)"
      />
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
let ghost: Element
let dragging: Element
let tabPushed: Element | null
let contentsPushed: Element | null
const onDragstart = (e: DragEvent, idx: number) => {
  console.log('tabbar > dragstart')
  fromIdx = idx
  dragging = (e.currentTarget as Element).parentElement as Element
  console.log('tabbar > dragstart > dragging: ', dragging)
  makeGhost(e)
  requestAnimationFrame(() => {
    dragging.classList.add('dragging')
  })
}

const onDragover = (e: DragEvent) => {
  console.log('tabbar > dragover')
  tabPushed = (e.currentTarget as Element).parentElement as Element
  tabPushed.classList.add('pushed')
  contentsPushed = tabPushed.children.namedItem('content')
  contentsPushed?.classList.add('pushed')
}

const onDragleave = (e: DragEvent) => {
  console.log('tabbar > dragleave')
  tabPushed = (e.currentTarget as Element).parentElement as Element
  tabPushed.classList.remove('pushed')
  contentsPushed = tabPushed.children.namedItem('content')
  contentsPushed?.classList.remove('pushed')
}

const onDrop = (e: DragEvent, idx: number) => {
  console.log('tabbar > drop')
  clearGhost()
  dragging.classList.remove('dragging')
  tabPushed = (e.currentTarget as Element).parentElement as Element
  tabPushed.classList.remove('pushed')
  contentsPushed = tabPushed.children.namedItem('content')
  contentsPushed?.classList.remove('pushed')
  tabStore.move(fromIdx, idx)
}

const onDragend = () => {
  console.log('tabbar > dragend')
  dragging.classList.remove('dragging')
}

const makeGhost = (e: DragEvent) => {
  console.log('tabbar > makeGhost')
  const t = (e.currentTarget as Element).parentElement as Element
  if (t !== null) {
    ghost = t.cloneNode(true) as Element
    document.body.appendChild(ghost)
    e.dataTransfer?.setDragImage(ghost, 0, 0)
  }
}

const clearGhost = () => {
  console.log('tabbar > clearGhost')
  ghost.remove()
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
  display: flex;
  justify-content: start;
  align-items: center;
}
.tab {
  position: relative;
  width: fit-content;
  height: 32px;
  padding: 0;
  margin: 0;
  overflow: visible;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab.dragging {
  display: none;
}
.tab.pushed {
  margin-right: 24px;
}
.drag-zone {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: 100%;
  padding: 6px 10px 8px 10px;
  border-radius: 2px 2px 0px 0px;
  border: none;
  background: white;
  transition: transform 0.5s;
}
.content.pushed {
  transform: translateX(24px);
}
.content::after {
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
.content.isCurrent::after {
  opacity: 1;
}
.name {
  padding-top: 1px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: seagreen;
}
.name:hover {
  color: darkblue;
  cursor: pointer;
}
.close-icon {
  width: 14px;
  font-weight: 500;
  color: seagreen;
}
.close-icon:hover {
  color: darkblue;
  cursor: pointer;
}
</style>