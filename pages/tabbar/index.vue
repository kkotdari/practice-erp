<template>
  <div class="flex-initial flex justify-content-start">
    <button v-if="openedTabs.length > 0" v-for="t in openedTabs" class="flex-initial">
      {{ t.menu.name }} <i class="pi pi-times-circle" v-on:click="tabStore.remove(t)" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTabStore } from '~/stores/tab'
const tabStore = useTabStore()
const openedTabs = computed(() => tabStore.openedTabs)
</script>