<template>
  <div class="auth-container">
    <div class="auth-form-container">
      <div class="auth-tabs">
        <SelectButton
          v-model="authBtnSelected"
          :options="authBtns"
          :option-label="o => o.name"
          :option-value="o => o.value"
          :default-value="storeAuthBtnSelected"
        />
      </div>
      <MyLogin
        v-if="storeAuthBtnSelected === 'login'"
      />
      <MySignup
        v-if="storeAuthBtnSelected === 'signup'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
const authBtns = computed(() => [
  { name: '로그인', value: 'login' },
  { name: '회원가입', value: 'signup' },
])

// authBtnSelected는 store의 값을 가져와서 사용해야함
const authBtnSelected = ref('login')
const storeAuthBtnSelected = computed(() => authStore.authBtnSelected)

watch(authBtnSelected, (newVal) => {
  console.log('authBtnSelected changed to: ', newVal)
  authStore.authBtnSelected = newVal
})
</script>

<style lang="css" scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 80px;
}
.auth-form-container {
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 8px;
}
.auth-tabs {
  width: 320px;
  height: 40px;
}
:deep(.p-selectbutton) {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 4px;
  gap: 4px;
  background-color: mediumseagreen;
  color: whitesmoke;
}
:deep(.p-togglebutton.p-component) {
  width: 50%;
  height: 100%;
}
:deep(.p-togglebutton.p-togglebutton-checked) {
  background-color: whitesmoke;
  color: seagreen;
}
:deep(.p-togglebutton-content) {
  font-size: 14px;
  font-weight: 600;
}
:deep(.p-togglebutton-content:hover) {
  color: darkblue;
}

</style>