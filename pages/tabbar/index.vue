<template>
  <div
    v-if="openedTabs.length > 0"
    class="tabs"
  >
    <button
      v-for="(t, idx) in openedTabs" :key="idx"
      class="tab"
      draggable="true"
      @dragstart="onDragstart($event, idx)"
      @dragover.prevent="onDragover($event)"
      @dragleave.prevent="onDragleave($event)"
      @dragend="onDragend()"
      @drop="onDrop($event, idx)"
      @click="requestChangeMenu(t)"
    >
      <div
        class="content"
        :class="t.isCurrent ? 'isCurrent': ''"
        name="content"
      >
        <span
          class="name"
          name="name"
          @mouseover="onMouseover($event)"
          @mouseleave="onMouseleave($event)"
        >
          {{ t.menu.name }}
        </span>
        <i
          class="close-icon pi pi-times"
          @mouseover="onMouseover($event)"
          @mouseleave="onMouseleave($event)"
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
let ghost: Element
let dragging: Element

const onMouseover = (e: Event) => {
  console.log('tabbar > onMouseover')
  const t = e.currentTarget as Element
  t.classList.add('mouseovered')
}

const onMouseleave = (e: Event) => {
  console.log('tabbar > onMouseleave')
  const t = e.currentTarget as Element
  t.classList.remove('mouseovered')
}

const onDragstart = (e: DragEvent, idx: number) => {
  console.log('tabbar > dragstart')
  fromIdx = idx
  dragging = (e.currentTarget as Element) as Element
  console.log('tabbar > dragstart > dragging: ', dragging)
  makeGhost(e)
  requestAnimationFrame(() => {
    dragging.classList.add('dragging')
  })
}

const onDragover = (e: DragEvent) => {
  console.log('tabbar > dragover')
  const tabMouseovered = (e.currentTarget as Element) as Element
  tabMouseovered.classList.add('mouseovered')
  const contentMouseovered = tabMouseovered.children.namedItem('content')
  contentMouseovered?.classList.add('mouseovered')
  const nameMouseovered = contentMouseovered?.children.namedItem('name')
  nameMouseovered?.classList.add('mouseovered')
}

const onDragleave = (e: DragEvent) => {
  console.log('tabbar > dragleave')
  const tabMouseovered = (e.currentTarget as Element) as Element
  tabMouseovered.classList.remove('mouseovered')
  const contentMouseovered = tabMouseovered.children.namedItem('content')
  contentMouseovered?.classList.remove('mouseovered')
  const nameMouseovered = contentMouseovered?.children.namedItem('name')
  nameMouseovered?.classList.remove('mouseovered')
}

const onDrop = (e: DragEvent, idx: number) => {
  console.log('tabbar > drop')
  clearGhost()
  dragging.classList.remove('dragging')
  const tabMouseovered = (e.currentTarget as Element) as Element
  tabMouseovered.classList.remove('mouseovered')
  const contentMouseovered = tabMouseovered.children.namedItem('content')
  contentMouseovered?.classList.remove('mouseovered')
  const nameMouseovered = contentMouseovered?.children.namedItem('name')
  nameMouseovered?.classList.remove('mouseovered')
  tabStore.move(fromIdx, idx)
}

const onDragend = () => {
  console.log('tabbar > dragend')
  clearGhost()
  dragging.classList.remove('dragging')
}

const makeGhost = (e: DragEvent) => {
  console.log('tabbar > makeGhost')
  const t = (e.currentTarget as Element) as Element
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
  width: 100%;
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
  transition: margin-right 0.25s;
}
.tab.dragging {
  display: none;
}
.tab.mouseovered {
  margin-right: 24px;
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
  border-radius: 4px 4px 0px 0px;
  border: none;
  background: white;
  transition: transform 0.25s;
}
.content.mouseovered {
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
.name.mouseovered {
  color: darkblue;
  cursor: pointer;
}
.close-icon {
  width: 14px;
  font-weight: 500;
  color: seagreen;
}
.close-icon.mouseovered {
  color: darkblue;
  cursor: pointer;
}
</style>