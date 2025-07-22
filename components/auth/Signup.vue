<template>
  <div class="signin-container">
    <form class="signin-form">
      <input v-model="id" type="text" placeholder="아이디">
      <input v-model="password" type="password" placeholder="비밀번호">
      <input v-model="passwordConfirm" type="password" placeholder="비밀번호 확인">
    </form>
  </div>
</template>

<script setup lang="ts">
const id = ref('')
const password = ref('')
const passwordConfirm = ref('')
</script>

<style lang="css" scoped>
.signin-container {
  width: 100%;
  height: fit-content;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
}
input {
  width: 100%;
  height: 25px;
  border: 2px solid darkgreen;
  border-radius: 4px;
  padding: 4px;
  font-size: 12px;
  color: darkgray;
}
</style>