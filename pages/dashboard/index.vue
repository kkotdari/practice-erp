<template>
  <MyFlex
    class="flex-column align-items-center justify-content-start" 
    style="width: 100%;padding: 20px;gap: 12px;">
    <div class="flex-1">
      <span style="font-size: 20px;font-weight: 800;">
        대시보드
      </span>
    </div>
    <table class="flex-1">
      <tr>
        <th>
          헤더1
        </th>
        <th>
          헤더2
        </th>
        <th>
          헤더3
        </th>
        <th>
          헤더4
        </th>
        <th>
          헤더5
        </th>
        <th>
          헤더6
        </th>
        <th>
          헤더7
        </th>
        <th>
          헤더8
        </th>
        <th>
          헤더9
        </th>
        <th>
          헤더10
        </th>
        <th>
          헤더11
        </th>
        <th>
          헤더12
        </th>
      </tr>
      <tr>
        <td>
          컬럼1
        </td>
        <td>
          컬럼2
        </td>
        <td>
          컬럼3
        </td>
        <td>
          컬럼4
        </td>
        <td>
          컬럼5
        </td>
        <td>
          컬럼6
        </td>
        <td>
          컬럼7
        </td>
        <td>
          컬럼8
        </td>
        <td>
          컬럼9
        </td>
        <td>
          컬럼10
        </td>
        <td>
          컬럼11
        </td>
        <td>
          컬럼12
        </td>
      </tr>
    </table>
  </MyFlex>
</template>

<script setup lang="ts">
import { MyFlex } from '#components';
</script>

<style scoped>
table, tr, th, td {
   border: 1px solid;
   border-collapse: collapse;
   padding: 4px;
}
</style>