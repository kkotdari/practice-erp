<template>
  <MyFlex
    class="flex-column align-items-start"
  >
    <MyFlex
      class="flex-initial justify-content-center align-items-center"
    >
      <MyFlex
        class="flex-initial flex-column justify-content-between align-items-center"
        style="width: 200px;height: 200px;background-color:lightcyan;"
      >
        <span>
          Logo
        </span>
        <span v-on:click="toggleSidebar">
          {{ isSidebarVisible ? "← Close" : "→ Open" }}
        </span>
      </MyFlex>
      <MyFlex
        class="flex-initial flex flex-column justify-content-between align-items-start"
        style="width: 1800px;height: 200px;background-color: aquamarine;"
      >
        <span>
          Top Right
        </span>
        <Tabbar />
      </MyFlex>
    </MyFlex>
    <MyFlex
      class="flex-initial flex justify-content-start align-items-start"
    >
      <Sidebar
        :isVisible=isSidebarVisible
      />
      <MyFlex
        class="flex-initial flex flex-column"
        style="height: 1600px;background-color: lavender; gap: 8px;"
      >
        <MyFlex
          class="justify-content-start"
          style="gap: 8px;"
        />
        <MyFlex v-slot="content" />
      </MyFlex>
    </MyFlex>
  </MyFlex>
</template>

<script setup lang="ts">
import Sidebar from '~/pages/sidebar/index.vue'
import Tabbar from '~/pages/tabbar/index.vue'

const isSidebarVisible = ref(true)
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}
</script>