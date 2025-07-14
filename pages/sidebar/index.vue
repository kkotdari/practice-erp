<template>
  <MyFlex
    v-show="isVisible"
    :style="{
      width: isVisible ? '200px' : '0',
      overflow: 'hidden',
      transition: 'width 0.5s cubic-bezier(.075,.82,.165,1)',
    }"
    style="height: 1600px;background-color: lightgoldenrodyellow;"
    class="flex-initial flex flex-column justify-content-start gap-2"
  >
    <button v-for="m in menus" v-on:click="requestChangeMenu(m)">
        {{ m.name }}
    </button>
  </MyFlex>
</template>

<script setup lang="ts">
import { type Menu, useMenuStore } from '~/stores/menu'

defineProps({
  isVisible: Boolean
})

const menuStore = useMenuStore()
const menus = computed(() => menuStore.menus)

const requestChangeMenu = (menu:Menu) => {
  menuStore.select(menu)
}
</script>