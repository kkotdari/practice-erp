<template>
  <div style="padding: 20px;display: flex; justify-content: center; align-items: start;">
    <Chart
      type="bar"
      :data="test"
      style="width: 500px;"
    />
  </div>
</template>

<script setup lang="ts">
const test = {
  labels: ['Tech', 'Finance', 'Healthcare', 'Energy', 'Consumer'],
  datasets: [
    {
      label: 'Portfolio Sector Allocation',
      data: [35, 20, 15, 10, 20],
      fill: false,
      backgroundColor: '#6366F1',
      borderColor: '#6366F1',
      tension: 0.4,
    },
  ],
}
</script>