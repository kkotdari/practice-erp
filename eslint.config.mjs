// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'vue/html-indent': ['error', 2, {
      baseIndent: 1,
      alignAttributesVertically: true,
      attributeIndent: 1,
    }]
  },
})
