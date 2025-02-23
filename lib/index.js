import { visit } from 'unist-util-visit';
import { encodePlantUML } from './encoder';
/**
 * Returns a Remark plugin that transforms PlantUML code blocks in the Markdown AST
 * into corresponding HTML image elements when the code block language matches one of the valid keywords.
 * @param serverUrl - The base URL of the PlantUML server.
 */
function plantUMLRemarkPlugin(serverUrl) {
    const validLangs = ['pumld', 'plantuml-diagram'];
    return function transformer(tree) {
        visit(tree, 'code', (node, index, parent) => {
            console.log('Visiting code node:', node.lang); // Debugging
            if (validLangs.includes(node.lang) && parent && typeof index === 'number') {
                const code = node.value.trim();
                const encoded = encodePlantUML(code);
                const url = `${serverUrl}${encoded}`;
                const imgHTML = `<div class="plantuml-diagram">
  <img src="${url}" alt="PlantUML diagram" style="max-width: 100%;" loading="lazy" />
</div>`;
                // Replace the code node with an HTML node containing the image.
                parent.children.splice(index, 1, {
                    type: 'html',
                    value: imgHTML,
                });
                console.log('Replaced code node with PlantUML image.'); // Debugging
            }
        });
    };
}
/**
 * Docusaurus Plugin for rendering PlantUML diagrams.
 * Uses the configureWebpack hook to modify the MDX loader configuration,
 * adding the PlantUML Remark plugin to the remarkPlugins array.
 */
export default function plantUMLPlugin(context, options) {
    console.log('PlantUML Plugin initialized with options:', options);
    const serverUrl = options.serverUrl
        ? options.serverUrl.endsWith('/')
            ? options.serverUrl
            : `${options.serverUrl}/`
        : 'https://www.plantuml.com/plantuml/svg/';
    return {
        name: 'plugin-docusaurus-plantuml',
        // extend webpack configuration to override MDX loader's remarkPlugins.
        configureWebpack(config, isServer, utils) {
            if (config.module?.rules) {
                for (const rule of config.module.rules) {
                    if (rule &&
                        typeof rule === 'object' &&
                        'test' in rule &&
                        rule.test instanceof RegExp &&
                        rule.test.test('dummy.mdx')) {
                        const processUseEntry = (useEntry) => {
                            if (typeof useEntry === 'object' &&
                                useEntry.loader &&
                                (useEntry.loader.includes('@mdx-js/loader') ||
                                    useEntry.loader.includes('@docusaurus/mdx-loader'))) {
                                console.log('Processing MDX loader:', useEntry.loader); // Debugging
                                // Ensure useEntry.options is an object (it might be a string)
                                if (!Array.isArray(useEntry.options.remarkPlugins)) {
                                    useEntry.options = {};
                                }
                                // Initialize the remarkPlugins array if it does not exist
                                if (!useEntry.options.remarkPlugins ||
                                    typeof useEntry.options.remarkPlugins !== 'object') {
                                    useEntry.options.remarkPlugins = [];
                                }
                                console.log('Before injection, remarkPlugins:', useEntry.options.remarkPlugins); // Debugging
                                // Insert our plugin at the beginning to run it early.
                                useEntry.options.remarkPlugins.unshift(plantUMLRemarkPlugin(serverUrl));
                                console.log('After injection, remarkPlugins:', useEntry.options.remarkPlugins); // Debugging
                            }
                        };
                        if (Array.isArray(rule.use)) {
                            for (const useEntry of rule.use) {
                                processUseEntry(useEntry);
                            }
                        }
                        else if (typeof rule.use === 'object') {
                            processUseEntry(rule.use);
                        }
                    }
                }
            }
            // Return an empty object since the configuration changes are applied directly.
            return {};
        },
    };
}
