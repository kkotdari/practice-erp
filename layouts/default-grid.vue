<template>
  <div
    class="layout-container"
    :class="[ isSidebarCollapsed ? 'sidebar-collapsed' : '']"
  >
    <div
      class="logo"
    >
      <span
        class="logo-text"
        :class="[ isSidebarCollapsed ? 'logo-text-shrinked' : '']"
        @click="$router.push('/')"
      >
        Lotte Chilsung
      </span>
    </div>
    <div class="header">
      <span
        class="header-text">
        로그인 | 회원가입
      </span>
    </div>
    <div class="tabbar">
      <Tabbar />
    </div>
    <div
      class="sidebar"
      :class="[ isSidebarCollapsed ? 'sidebar-collapsed' : '']"
    >
      <Sidebar
      />
      <i
        class="sidebar-control-button"
        :class="[isSidebarCollapsed ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left']"
        @click="isSidebarCollapsed = !isSidebarCollapsed"
      />
    </div>
    <div class="content-container">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabbar from '~/pages/tabbar/index.vue'
import Sidebar from '~/pages/sidebar/index.vue'

const isSidebarCollapsed = ref<boolean>(false)
</script>

<style lang="css" scoped>
.layout-container {
  display: grid;
  grid-template-areas: 
    "logo header"
    "logo tabbar"
    "sidebar content";
  grid-template-columns: 160px 1fr;
  grid-template-rows: 40px 40px 1fr;
  transition: grid-template-columns 0.5s;
}
.layout-container.sidebar-collapsed {
  grid-template-columns: 0 1fr;
}
.logo {
  grid-area: logo;
  overflow: visible;
  min-width: 0;
  position: relative;
}
.logo-text {
  position: absolute;
  top: 24px;
  left: 12px;
  font-size: 20px;
  font-style: oblique;
  font-weight: 900;
  color:seagreen;
  white-space: nowrap;
  cursor: pointer;
  transition: top 0.5s, font-size 0.5s, color 0.5s;
}
.logo-text-shrinked {
  top: 12px;
  font-size: 10px;
  color: whitesmoke;
}
.header {
  grid-area: header;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 24px;
  background-color: darkgreen;
}
.header-text {
  font-size: 12px;
  font-weight: 600;
  color: whitesmoke;
}
.tabbar {
  grid-area: tabbar;
  display: flex;
  justify-content: start;
  align-items: end;
  background-color: darkgreen;
}
.sidebar {
  grid-area: sidebar;
  width: 100%;
  height: 100%;
  padding: 12px 0 12px 0;
  display: flex;
  justify-content: start;
  align-items: start;
  position: relative;
  background-color: mediumseagreen;
  min-width: 0;
  transition: padding-left 0.5s, padding-right 0.5s;
}
.sidebar.sidebar-collapsed {
  padding-left: 0;
  padding-right: 0;
}
.sidebar-control-button {
  position: absolute;
  top: 0;
  left: 100%;
  margin-top: 4px;
  margin-left: 4px;
  background: none;
  cursor: pointer;
  font-size: 14px;
}
.content-container {
  grid-area: content;
  padding: 24px;
}
</style>