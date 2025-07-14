<template>
  <div class="flex-initial flex justify-content-start">
    <button v-if="openedTabs.length > 0" v-for="t in openedTabs" class="flex-initial tab">
      {{ t.menu.name }} <i class="pi pi-times-circle tab-close-icon" v-on:click="tabStore.remove(t)" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTabStore } from '~/stores/tab'
const tabStore = useTabStore()
const openedTabs = computed(() => tabStore.openedTabs)
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