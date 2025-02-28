/// <reference types="@docusaurus/module-type-aliases" />

declare module 'docusaurus-theme-plantuml' {
  import type { ThemeConfig as DocusaurusThemeConfig } from '@docusaurus/theme-common';
  import type { DeepPartial } from 'utility-types';
  import type { Plugin } from '@docusaurus/types';

  export interface ThemeConfig extends DocusaurusThemeConfig {
    plantuml?: PlantumlConfig;
  }
  export interface PlantumlConfig {
    /** Server URL for light mode */
    serverUrlLight: string;
    /** Server URL for dark mode */
    serverUrlDark: string;
    /** debug mode */
    debug?: boolean;
  }

  export type UserThemeConfig = DeepPartial<ThemeConfig>;

  export default function themePlantUML(): Plugin<undefined>;
}

declare module '@theme/PlantUML' {
  import type { ReactNode } from 'react';

  export interface Props {
    value: string;
  }

  export default function PlantUML(props: Props): ReactNode;
}

export {};
