import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwindcss from 'eslint-plugin-tailwindcss'
import nextPlugin from '@next/eslint-plugin-next'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      tailwindcss: tailwindcss,
      '@next/next': nextPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'react/jsx-key': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn'
    },

    ignores: ['node_modules', 'dist', '*.esm.js']
  },
  ...nextPlugin.configs['core-web-vitals']
]
