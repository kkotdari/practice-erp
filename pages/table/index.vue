<template>
  <div class="content">
    <div
      class="title"
    >
      <span class="title-text">
        테이블
      </span>
    </div>
    <table class="table-1">
      <thead>
        <tr>
          <td style="width: 80px;"/>
          <th colspan="2">
            헤더1, 2
          </th><th>
            헤더3
          </th>
          <th>
            헤더4
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="3">
            A
          </td>
          <td>
            A-1-1
          </td>
          <td>
            A-1-2
          </td>
          <td>
            A-1-3
          </td>
          <td>
            A-1-4
          </td>
        </tr>
        <tr>
          <td>
            A-2-1
          </td>
          <td>
            A-2-2
          </td>
          <td>
            A-2-3
          </td>
          <td>
            A-2-4
          </td>
        </tr>
        <tr>
          <td>
            A-3-1
          </td>
          <td>
            A-3-2
          </td>
          <td>
            A-3-3
          </td>
          <td>
            A-3-4
          </td>
        </tr>
        <tr>
          <td rowspan="2">
            B
          </td>
          <td>
            B-1-1
          </td>
          <td>
            B-1-2
          </td>
          <td>
            B-1-3
          </td>
          <td>
            B-1-4
          </td>
        </tr>
        <tr>
          <td>
            B-2-1
          </td>
          <td>
            B-2-2
          </td>
          <td>
            B-2-3
          </td>
          <td>
            B-2-4
          </td>
        </tr>
        <tr>
          <td rowspan="3">
            C
          </td>
          <td>
            C-1-1
          </td>
          <td>
            C-1-2
          </td>
          <td>
            C-1-3
          </td>
          <td>
            C-1-4
          </td>
        </tr>
        <tr>
          <td>
            C-2-1
          </td>
          <td>
            C-2-2
          </td>
          <td>
            C-2-3
          </td>
          <td>
            C-2-4
          </td>
        </tr>
        <tr>
          <td>
            C-3-1
          </td>
          <td>
            C-3-2
          </td>
          <td>
            C-3-3
          </td>
          <td>
            C-3-4
          </td>
        </tr>
      </tbody>
    </table>
  </div></template>

<script setup lang="ts">
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
}
.title {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;

}
table, tr, th, td {
   border: 1px solid;
   border-collapse: collapse;
   background-color: white;
   padding: 12px 24px 12px 24px;
   text-align: center;
}
</style>