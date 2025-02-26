const assert = require('node:assert/strict');
const { test } = require('node:test');
const { validateThemeConfig, DEFAULT_THEME_CONFIG } = require('../../lib/validateThemeConfig');

test('Default serverUrlLight when not provided', () => {
  const result = validateThemeConfig({
    validate: (schema, config) => schema.validate(config, { convert: true }).value,
    themeConfig: {},
  });
  assert.equal(
    result.plantuml.serverUrlLight,
    DEFAULT_THEME_CONFIG.plantuml.serverUrlLight,
    'serverUrlLight should default to the predefined value',
  );
});

test('Custom serverUrlLight is applied', () => {
  const customUrl = 'https://example.com/light/';
  const result = validateThemeConfig({
    validate: (schema, config) => schema.validate(config, { convert: true }).value,
    themeConfig: { plantuml: { serverUrlLight: customUrl } },
  });
  assert.equal(
    result.plantuml.serverUrlLight,
    customUrl,
    'serverUrlLight should be overridden with the custom value',
  );
});

test('Default serverUrlDark when not provided', () => {
  const result = validateThemeConfig({
    validate: (schema, config) => schema.validate(config, { convert: true }).value,
    themeConfig: {},
  });
  assert.equal(
    result.plantuml.serverUrlDark,
    DEFAULT_THEME_CONFIG.plantuml.serverUrlDark,
    'serverUrlDark should default to the predefined value',
  );
});

test('Custom serverUrlDark is applied', () => {
  const customUrl = 'https://example.com/dark/';
  const result = validateThemeConfig({
    validate: (schema, config) => schema.validate(config, { convert: true }).value,
    themeConfig: { plantuml: { serverUrlDark: customUrl } },
  });
  assert.equal(
    result.plantuml.serverUrlDark,
    customUrl,
    'serverUrlDark should be overridden with the custom value',
  );
});
