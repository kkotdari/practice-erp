<template>
  <div
    class="layout-container"
    :class="[ isSidebarCollapsed ? 'sidebar-collapsed' : '']"
  >
    <div
      class="logo"
    >
      <span
        class="logo-text-lg"
        :class="[ isSidebarCollapsed ? 'logo-text-lg-shrinked' : '']"
        @click="goHome()"
      >
        Lotte Chilsung
      </span>
      <span
        class="logo-text-sm"
        :class="[ isSidebarCollapsed ? 'logo-text-sm-shrinked' : '']"
        @click="goHome()"
      >
        홈으로 가기
      </span>
    </div>
    <div class="header">
      <span
        class="header-text"
        @click="goAuth('login')"  
      >
        로그인
      </span>
      <span>
        &nbsp;|&nbsp;
      </span>
      <span
        class="header-text"
        @click="goAuth('signup')"
      >
        회원가입
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
import { useMenuStore } from '~/stores/menu'
import { useTabStore } from '~/stores/tab'
import { useAuthStore } from '~/stores/auth'
const menuStore = useMenuStore()
const tabStore = useTabStore()
const authStore = useAuthStore()
const router = useRouter()

const isSidebarCollapsed = ref<boolean>(false)
const goHome = () => {
  menuStore.select(null)
  tabStore.select(null)
  router.push('/')
}
const goAuth = (authType: string) => {
  menuStore.select(null)
  tabStore.select(null)
  authStore.authBtnSelected = authType
  router.push('/auth')
}
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
.logo-text-lg {
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
.logo-text-sm {
  position: absolute;
  top: 48px;
  left: 40px;
  font-size: 14px;
  font-weight: 700;
  color:seagreen;
  white-space: nowrap;
  cursor: pointer;
  transition: top 0.5s, font-size 0.5s, color 0.5s;
}
.logo-text-lg-shrinked {
  top: 12px;
  font-size: 12px;
  color: whitesmoke;
}
.logo-text-sm-shrinked {
  top: 12px;
  left: 96px;
  font-size: 12px;
  color: whitesmoke;
}
.header {
  grid-area: header;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 12px 24px;
  background-color: darkgreen;
  font-size: 12px;
  font-weight: 700;
  color: whitesmoke;
}
.header-text:hover {
  color: darkblue;
  cursor: pointer;
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
  color: darkgreen;
  cursor: pointer;
  font-size: 14px;
}
.content-container {
  grid-area: content;
  padding: 24px;
}
</style>