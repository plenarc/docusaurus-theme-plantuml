import type { Plugin } from '@docusaurus/types';

export interface PluginOptions {
  /** Server URL for light mode */
  serverUrlLight?: string;
  /** Server URL for dark mode */
  serverUrlDark?: string;
}

export default function themePlantUML(options: PluginOptions = {}): Plugin<void> {
  // const { serverUrlLight, serverUrlDark } = options;

  return {
    name: 'docusaurus-theme-plantuml',

    getThemePath() {
      return './theme';
    },
    getTypeScriptThemePath() {
      return './src/theme';
    },
  };
}

export { validateThemeConfig } from './validateThemeConfig';
