# plugin-docusaurus-planguml

plugin for displaying plantuml in docusaurus.

[![MIT Licence](https://img.shields.io/github/license/flatring/plugin-docusaurus-planguml)](#)

[![npm version](https://badge.fury.io/js/plugin-docusaurus-planguml.svg)](https://www.npmjs.com/package/plugin-docusaurus-planguml)

## What is this?

1. en
    1. This is a plugin to display plantuml in docusaurus
    1. It uses the results rendered on the plantuml server via https communication
1. jp
    1. これはdocusaurusにplantumlを表示するためのプラグインです
    1. https通信でplantuml serverにレンダリングした結果を使用します

## How to Use?

```sh
pnpm add plugin-docusaurus-planguml
```

or

```sh
npm install plugin-docusaurus-plantuml
```

or

```sh
yarn add plugin-docusaurus-plantuml
```



### How to set up on docusaurus

docusaurus.config.js

```js
module.exports = {
  // ...other settings
  plugins: [
    [
      require.resolve('docusaurus-plantuml-plugin'),
      {
        serverUrl: 'https://www.plantuml.com/plantuml/svg/' // always specify 'https'
      }
    ]
  ]
};
```

### Then build your Docusaurus project

```sh
pnpm run build
```

or

```sh
npm run build
```

or

```sh
yarn run build
```

## Options available

| Option        | Type      | Default                                   | Description            |
| ------------- | --------- | ----------------------------------------- | ---------------------- |
| `serverUrl`   | `string`  | `https://www.plantuml.com/plantuml/svg/`  | Server url of plantuml |


## Changelog
Checkout the [releases](https://github.com/flatring/plugin-docusaurus-planguml/releases) page for changelog.
