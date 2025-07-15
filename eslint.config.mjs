import withNuxt from './.nuxt/eslint.config.mjs'
import tsPlugin  from '@typescript-eslint/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'

export default withNuxt({
  plugins: {
    vue: pluginVue,
    '@typescript-eslint': tsPlugin
  },
  ignores: [
    'node_modules/**',
    '.nuxt/**',
    '.output/**',
    'dist/**'
  ],
  rules: {
    // 공통 JS/TS 들여쓰기 2칸
    indent: ['error', 2],

    // Vue 템플릿 들여쓰기 2칸
    'vue/html-indent': ['error', 2],
    'vue/multi-word-component-names': 'off',

    // TypeScript 관련 룰
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
})