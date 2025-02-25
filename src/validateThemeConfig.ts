import type { ThemeConfigValidationContext } from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';
import type { ThemeConfig } from 'docusaurus-theme-plantuml';

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  plantuml: {
    serverUrlLight: 'https://www.plantuml.com/plantuml/svg/',
    serverUrlDark: 'https://www.plantuml.com/plantuml/dsvg/',
  },
};

export const Schema = Joi.object<ThemeConfig>({
  plantuml: Joi.object({
    serverUrlLight: Joi.string().default(DEFAULT_THEME_CONFIG.plantuml.serverUrlLight),
    serverUrlDark: Joi.string().default(DEFAULT_THEME_CONFIG.plantuml.serverUrlDark),
  }).default(DEFAULT_THEME_CONFIG.plantuml),
});

export function validateThemeConfig({
  validate,
  themeConfig,
}: ThemeConfigValidationContext<typeof DEFAULT_THEME_CONFIG>): typeof DEFAULT_THEME_CONFIG {
  return validate(Schema, themeConfig);
}
