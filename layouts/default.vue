<template>
  <div
    class="flex flex-column"
  >
    <div
      class="flex justify-content-start"
      style="height: 80px;position: relative;"
    >
      <div
        class="logo-box flex justify-content-center align-items-center"
        :class="[ isSidebarVisible ? '' : 'logo-box-collapsed']"
      >
        <span
          class="logo"
          :class="[ isSidebarVisible ? '' : 'logo-shrinked']"
          style="width: 100%;text-align: left;"
          @click="$router.push('/')"
        >
          Lotte Chilsung
        </span>
      </div>
      <div
        class="flex-1 flex flex-column justify-content-between align-items-start"
        style="background-color: aquamarine;"
      >
        <div
          class="flex"
        >
          <div
            class="flex justify-content-end align-items-end"
            style="padding: 12px 20px 0 0;">
            <span style="font-size: 12px;font-weight: 700;">
              로그인 | 회원가입
            </span>
          </div>
        </div>
        <div
          class="flex justify-content-start align-items-end"
          style="padding-left: 20px;"
        >
          <Tabbar />
        </div>
      </div>
    </div>
    <div
      class="flex justify-content-start"
    >
      <Sidebar
        @update="updateSidebarVisibility"
      />
      <div
        class="flex-1 flex flex-column"
        style="padding: 20px;"
      >
        <div
          class="layout-main-slot"
        >
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabbar from '~/pages/tabbar/index.vue'
import Sidebar from '~/pages/sidebar/index.vue'

const isSidebarVisible = ref<boolean>(true)
const updateSidebarVisibility = (visible:boolean) => {
  isSidebarVisible.value = visible
  console.log('isSidebarVisible updated to: ', isSidebarVisible.value)
}
</script>

<style lang="css" scoped>
.logo-box {
  width: 160px;
  transition: width 1s;
}
.logo-box-collapsed {
  width: 0;
}
.logo {
  top: 24px;
  left: 12px;
  font-size: 20px;
  font-style: oblique;
  font-weight: 900;
  cursor: pointer;
  position: absolute;
  transition: top 1s, left 1s, font-size 1s;
}
.logo-shrinked {
  top: 12px;
  left: 24px;
  font-size: 10px;
}
</style>