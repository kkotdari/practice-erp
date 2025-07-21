<template>
  <div class="carousel">
    <img
      v-for="(src, i) in images"
      :key="i"
      :src="src"
      :class="['slide', current === i && 'slide-active']"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[],
  interval?: number,
}>()
const current = ref(0)
const delay = props.interval ?? 3000
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    current.value = (current.value + 1) % props.images.length
  }, delay)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="css" scoped>
.carousel {
  position: relative;
  width: 400px;
  height: 400px;
}
.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.slide-active {
  opacity: 1;
}
</style>