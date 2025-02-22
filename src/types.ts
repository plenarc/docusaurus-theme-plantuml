import type { MDXPlugin } from '@docusaurus/mdx-loader';

export interface DocusaurusPluginPlantUmlOptions {
  serverUrl?: string;
  remarkPlugins: MDXPlugin[];
  rehypePlugins: MDXPlugin[];
}
