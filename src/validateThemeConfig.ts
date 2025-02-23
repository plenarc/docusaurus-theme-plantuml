import type { ThemeConfigValidationContext } from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';
import type { ThemeConfig } from 'flatring/docusaurus-theme-plantuml';

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  plantuml: {
    theme: {
      dark: 'dark',
      light: 'default',
    },
    options: {},
  },
};

export const Schema = Joi.object<ThemeConfig>({
  plantuml: Joi.object({
    theme: Joi.object({
      dark: Joi.string().default(DEFAULT_THEME_CONFIG.plantuml.theme.dark),
      light: Joi.string().default(DEFAULT_THEME_CONFIG.plantuml.theme.light),
    }).default(DEFAULT_THEME_CONFIG.plantuml.theme),
    options: Joi.object().default(DEFAULT_THEME_CONFIG.plantuml.options),
  }).default(DEFAULT_THEME_CONFIG.plantuml),
});

export function validateThemeConfig({
  validate,
  themeConfig,
}: ThemeConfigValidationContext<ThemeConfig>): ThemeConfig {
  return validate(Schema, themeConfig);
}
