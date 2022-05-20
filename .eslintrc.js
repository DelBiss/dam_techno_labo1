module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: 2022,
        sourcetype: 'module',
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/no-deprecated-slot-attribute': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

    },
    overrides: [{
        files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
            jest: true
        }
    }]
}