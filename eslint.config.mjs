import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['events/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        ignores: ['.gitignore'],
        plugins: {
            react: eslintReact,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: globals.browser
        },
        rules: {
            'react/react-in-jsx-scope': 'off'
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
