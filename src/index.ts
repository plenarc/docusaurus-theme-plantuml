import type { Plugin } from '@docusaurus/types';

export default function themePlantUML(): Plugin<void> {
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
