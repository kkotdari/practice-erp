export const useAuthStore = defineStore('auths', () => {
  const authBtnSelected = ref<string>('')

  return {
    authBtnSelected,
  }
})