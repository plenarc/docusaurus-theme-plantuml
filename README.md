# docusaurus-theme-plantuml


Theme for displaying PlantUML in docusaurus.

[![npm version][npm-image]][npm-url]
[![npm downlads][npm-downloads-image]][npm-url]
[![License][license-image]][license-url]

## What is this?
### en
1. this is a theme for displaying plantuml diagrams on docusaurus.
    1. at first, I tried to make it as a plugin, but it did not work, so I made it as a theme
1. the default setting is to display the results rendered by the plantuml server via https communication.

### ja
1. これはdocusaurusにplantumlの図を表示するためのテーマです
    1. 最初、pluginとして作ろうとしましたがうまくいかなかったのでテーマとして作っています
1. デフォルト設定ではhttps通信でplantuml serverにレンダリングさせた結果を表示します

## image
1. light mode
    1. ![img](img/lightmode.png)
1. dark mode
    1. ![img](img/darkmode.png)

## Precautions before use
### en
1. The default rendering destination is the official PlantUML server.
1. Even though it is official, rendering is done via http, so if you handle confidential information, please set up your own server, etc., and use at your own risk.
1. see below
    1. plantuml.com/en/faq - https://plantuml.com/en/faq
        1. How long do the images generated by PlantUML Server live for?

### ja
1. デフォルトのレンダリング先はPlantUML公式のサーバーです。
1. 公式とはいえ、httpを介してレンダリングしているので、機密情報を扱う場合には自分でサーバーを立てるなどして、自己責任のうえ活用してください。
1. 以下を参照
    1. plantuml.com/ja/faq - https://plantuml.com/ja/faq
        1. PlantUML Serverで生成した画像はいつまで保持されますか?

## How to Use?
### install

```sh
pnpm add docusaurus-theme-plantuml
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
  themes: [
    require.resolve('docusaurus-theme-plantuml'),
  ]
};
```

### Example of description in markdown

```markdown
    ## plantuml example

    ```pumld
    @startuml
    Alice -> Bob: Hello
    @enduml
    ```

    or

    ```plantuml-diagram
    @startuml
    start
    :Hello world;
    :This is defined on
    several **lines**;
    stop
    @enduml
    ```
```

#### en
1. We also take into account the case where you want to display PlantUML code as markdown and not “plantuml” to render it when
    1. `plantuml-diagram`
    1. `pumld`

#### ja
1. markdownとしてPlantUMLのコードを表示したい場合も考慮して「plantuml」ではなく、以下の場合にレンダリングするようにしています。
    1. `plantuml-diagram`
    1. `pumld`

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

| Option           | Type      | Default                                   | Description               |
| ---------------- | --------- | ----------------------------------------- | ------------------------- |
| `serverUrlLight` | `string`  | `https://www.plantuml.com/plantuml/svg/`  | Server URL for light mode |
| `serverUrlDark`  | `string`  | `https://www.plantuml.com/plantuml/dsvg/` | Server URL for dark mode  |
| `debug`          | `boolean` | `false`                                   | Turn on debug log output  |

### en
1. by default, the official PlantUML server renders the image in SVG format
1. docker is recommended if you want to prepare your own PlantUML server. specify its server URL as `serverUrlLight` etc.
    1. reference: dockerhub - https://hub.docker.com/r/plantuml/plantuml-server
1. for example, if you want to render in PNG format, configure as follows

### ja
1. デフォルトはPlantUML公式のサーバーでSVG形式にレンダリングしています
1. 自分でPlantUMLサーバーを用意するのであればdockerがオススメです。そのサーバーURLを`serverUrlLight`などに指定してください
    1. 参考: dockerhub - https://hub.docker.com/r/plantuml/plantuml-server
1. 例えばPNG形式でレンダリングしたければ以下のように設定します

```js
module.exports = {
  // ...other settings
  themeConfig: [
    plantuml: {
      serverUrlLight: 'https://www.plantuml.com/plantuml/png/',
      serverUrlDark: 'https://www.plantuml.com/plantuml/dpng/',
    },
  ],
};
```

- Note that the destination is `themeConfig`, not `themes`.
- 設定先が `themes` ではなく、 `themeConfig` であることに注意してください

## Changelog
Checkout the [releases](https://github.com/plenarc/docusaurus-theme-plantuml/releases) page for changelog.

[npm-image]: https://img.shields.io/npm/v/docusaurus-theme-plantuml.svg
[npm-url]: https://www.npmjs.com/package/docusaurus-theme-plantuml
[npm-downloads-image]: https://img.shields.io/npm/dw/docusaurus-theme-plantuml.svg
[license-image]: https://img.shields.io/github/license/plenarc/docusaurus-theme-plantuml.svg
[license-url]: https://github.com/plenarc/docusaurus-theme-plantuml/blob/main/LICENSE
