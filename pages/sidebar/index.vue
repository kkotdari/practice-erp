<template>
  <MyFlex
     class="flex-column justify-content-start"
  >
    <button v-for="m in menus" v-on:click="requestChangeMenu(m)">
        {{ m.name }}
    </button>
  </MyFlex>
</template>

<script setup lang="ts">
import { type Menu, useMenuStore } from '~/stores/menu'

const menuStore = useMenuStore()
const menus = computed(() => menuStore.menus)

const requestChangeMenu = (menu:Menu) => {
  menuStore.select(menu)
}
</script>