# eslint-config-origami-component

This is an ESLint configuration which aims to ensure all Origami components' source code is consistent in style.

## Usage

Just install this package somewhere your eslint can find it (`npm
install -g eslint-config-origami-component` if your eslint is installed with
`-g` too), and put
this in your `.eslintrc` or wherever you keep your project's eslint
config:

```
{
    "extends": "eslint-config-origami-components", // You can omit the `eslint-config-` part

    "rules": {
        // Override any settings from the "parent" configuration
        // For example, Next may want to override some rules for their Next components
    }
}
```

