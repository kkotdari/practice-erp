<template>
  <MyFlex
    class="flex-column align-items-start"
  >
    <MyFlex
      class="flex-initial justify-content-center align-items-center"
      style="width: 100%;"
    >
      <MyFlex
        class="flex-initial flex-column justify-content-center align-items-center"
        style="width: 200px;height: 80px;background-color:lightcyan;"
      >
        <span>
          Lotte Chilsung
        </span>
      </MyFlex>
      <MyFlex
        class="flex-initial flex flex-column justify-content-between align-items-start"
        style="width: 100%;height: 80px;background-color: aquamarine;"
      >
        <div
          class="flex-initial flex justify-content-end align-items-end"
          style="width: 100%;"
        >
          <div style="padding: 4px;font-size: 12px;">
            로그인 | 회원가입
          </div>
        </div>
        <div
          class="flex-initial flex justify-content-start align-items-end"
          style="width: 100%;padding-left: 20px;"
        >
          <Tabbar />
        </div>
      </MyFlex>
    </MyFlex>
    <MyFlex
      class="flex-initial flex justify-content-start align-items-start"
      style="width: 100%;"
    >
      <Sidebar/>
      <MyFlex
        class="flex-initial flex flex-column"
        style="width: 100%;height: 1600px;background-color: lavender; gap: 8px;"
      >
        <MyFlex
          class="justify-content-start"
          style="gap: 8px;"
        />
        <div class="layout-main-slot">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
      </MyFlex>
    </MyFlex>
  </MyFlex>
</template>

<script setup lang="ts">
import Tabbar from '~/pages/tabbar/index.vue'
import Sidebar from '~/pages/sidebar/index.vue'
</script>