import Joi, { type Schema, type ValidationResult } from 'joi';
import type { ThemeConfig } from './theme-plantuml';

export const DEFAULT_THEME_CONFIG = {
  plantuml: {
    serverUrlLight: 'https://www.plantuml.com/plantuml/svg/',
    serverUrlDark: 'https://www.plantuml.com/plantuml/dsvg/',
  },
};

const plantumlSchema = Joi.object({
  serverUrlLight: Joi.string().optional().default(DEFAULT_THEME_CONFIG.plantuml.serverUrlLight),
  serverUrlDark: Joi.string().optional().default(DEFAULT_THEME_CONFIG.plantuml.serverUrlDark),
});

const ThemeConfigSchema = Joi.object({
  plantuml: plantumlSchema.optional().default(DEFAULT_THEME_CONFIG.plantuml),
});

export function validateThemeConfig({
  validate,
  themeConfig,
}: {
  validate: (schema: Schema, config: ThemeConfig) => ValidationResult<ThemeConfig>;
  themeConfig: ThemeConfig;
}) {
  return validate(ThemeConfigSchema, themeConfig);
}
