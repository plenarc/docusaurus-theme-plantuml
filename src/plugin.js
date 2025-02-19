import { Plugin, LoadContext } from '@docusaurus/types';
import { encodePlantUML } from './encoder';
import { visit } from 'unist-util-visit';

interface PlantUMLPluginOptions {
  /**
   * en: URL of the PlantUML server to be used (a trailing slash is required)
   * jp: 利用するPlantUMLサーバーのURL(末尾にスラッシュが必要です)
   * example: "https://www.plantuml.com/plantuml/svg/"
   */
  serverUrl?: string;
}

export default function plantUMLPlugin(
  _context: LoadContext,
  options: PlantUMLPluginOptions,
): Plugin<unknown> {
  const serverUrl =
    options.serverUrl || 'https://www.plantuml.com/plantuml/svg/';
  return {
    name: 'docusaurus-plantuml-plugin',
    // en: Add remark plugin to Docusaurus Markdown settings
    // jp: DocusaurusのMarkdown設定にremarkプラグインを追加
    extendMarkdownOptions(mdOptions: any) {
      mdOptions.remarkPlugins = mdOptions.remarkPlugins || [];
      mdOptions.remarkPlugins.push(function plantumlRemarkPlugin() {
        return (tree: any) => {
          visit(tree, 'code', (node: any, index: number | null, parent: any) => {
            if (node.lang === 'plantuml' && parent && typeof index === 'number') {
              const code = node.value;
              // en: Convert to a format that can be rendered by the PlantUML server
              // jp: PlantUMLサーバーでレンダリングできる形式へ変換
              const encoded = encodePlantUML(code);
              const url = `${serverUrl}${encoded}`;
              // en: Use secure HTTPS communication (please specify serverUrl with https://)
              // jp: セキュアなHTTPS通信を利用(https://で指定してください)
              const imgHTML = `<img src="${url}" alt="PlantUML diagram" style="max-width: 100%;" />`;
              // en: Replace code node with HTML node in Markdown AST
              // jp: Markdown AST上でcodeノードをHTMLノードに置換
              parent.children.splice(index, 1, {
                type: 'html',
                value: imgHTML,
              });
            }
          });
        };
      });
    },
  };
}
