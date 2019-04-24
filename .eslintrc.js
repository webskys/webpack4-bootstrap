module.exports = {
    root: true,
    env: {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true,
        "jquery": true
    },
    "extends": [
        "standard",
        "eslint:recommended"
    ],
    "rules": {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-extra-semi':2,
        'quotes':[2,'single']
    },
    parser: 'babel-eslint'
};