<template>
  <div
    class="flex flex-column justify-content-start align-items-center" 
    style="padding: 20px;gap: 16px;">
    <div
      class="flex justify-content-center"
      style="height: fit-content;"
    >
      <span style="font-size: 20px;font-weight: 800;">
        대시보드
      </span>
    </div>
    <table style="width: fit-content;height: fit-content;">
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
import { MyFlex } from '#components';
</script>

<style scoped>
table, tr, th, td {
   border: 1px solid;
   border-collapse: collapse;
   background-color: white;
   padding: 12px 24px 12px 24px;
   text-align: center;
}
</style>