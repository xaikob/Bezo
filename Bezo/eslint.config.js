import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import prettier from 'eslint-plugin-prettier/recommended'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node // Если есть серверный код
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
  {
    plugins: { prettier: prettier },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': ['error', {
        semi: false,
        singleQuote: true,
        printWidth: 100
      }]
    }
  }
])
