import withNuxt from './.nuxt/eslint.config.mjs'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vueParser from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'

export default withNuxt({
  // JS, TS, Vue 모두 검사 대상
  files: ['**/*.{js,ts,vue}'],
  
  // 플러그인 등록
  plugins: {
    vue: pluginVue,
    '@typescript-eslint': tsPlugin
  },
  
  // Nuxt 기본 parserOptions는 그대로 살리되,
  // TS 파일에 한해 아래 파서를 덮어씌워 줍니다
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tsParser,
      project: './tsconfig.json',
      extraFileExtensions: ['.vue'],
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    // 전역 변수 등록
    globals: {
      defineNuxtConfig: 'readonly'
    },
  },

  // 산출물 무시
  ignores: [
    'node_modules/**',
    '.nuxt/**',
    '.output/**',
    'dist/**'
  ],

  // 공통+Vue+TS 룰
  rules: {
    // JS/TS 들여쓰기
    indent: ['error', 2],

    // 트레일링 콤마
    'comma-dangle': ['error', 'always-multiline'],
    
    // Vue 템플릿 들여쓰기
    'vue/html-indent': ['error', 2],
    'vue/multi-word-component-names': 'off',

    // TS 전용 룰
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  }
})