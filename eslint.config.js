import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
      settings: {
          'import/resolver': {
              alias: {
                  map: [
                      ['@', './src'],
                      ['@components', './src/components'],
                  ],
                  extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
              },
          },
      },
    rules: {
        "indent": ["error", 2],
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "curly": "error",
        "keyword-spacing": "error",
        "array-bracket-spacing": ["error", "always"],
        "space-in-parens": ["error", "always"],
        "template-curly-spacing": ["error", "always"],
        "arrow-spacing": "error",
        "object-curly-spacing": ["error", "always"],
        'vue/multi-word-component-names': 'off',

    },
  },
)
