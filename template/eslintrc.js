module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "rules": {
        "semi": "off",
        "no-console": "off",
        "react/jsx-filename-extension": "off",
        "react/prefer-stateless-function": "warn"
    },
    "extends": ["eslint:recommended", "airbnb"]
};
