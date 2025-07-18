<template>
  <MyFlex
    class="flex-column align-items-start"
    style="width: 100%;"
  >
    <MyFlex
      class="justify-content-start align-items-center"
      style="width: 100%;"
    >
      <MyFlex
        class="flex-column justify-content-center align-items-center"
        style="width: 160px;height: 80px;"
      >
        <span
          style="width: 100%;padding: 12px;font-size: 20px;font-style: oblique;font-weight: 900;"
          @click="$router.push('/')"
        >
          Lotte Chilsung
        </span>
      </MyFlex>
      <MyFlex
        class="flex-column justify-content-between align-items-start"
        style="flex: 1;height: 80px;background-color: aquamarine;"
      >
        <div
          class="flex justify-content-end align-items-end"
          style="width: 100%;"
        >
          <div style="padding: 12px 20px 0 0;">
            <span style="font-size: 12px;font-weight: 700;">
              로그인 | 회원가입
            </span>
          </div>
        </div>
        <div
          class="flex justify-content-start align-items-end"
          style="width: 100%;padding-left: 20px;"
        >
          <Tabbar />
        </div>
      </MyFlex>
    </MyFlex>
    <div
      style="display: flex;width: 100%;"
    >
      <Sidebar/>
      <MyFlex
        class="flex-1 flex-column"
        style="padding: 20px;"
      >
        <div class="layout-main-slot">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
      </MyFlex>
    </div>
  </MyFlex>
</template>

<script setup lang="ts">
import Tabbar from '~/pages/tabbar/index.vue'
import Sidebar from '~/pages/sidebar/index.vue'
</script>