import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ErrorBoundaryErrorMessageFallback, useThemeConfig } from '@docusaurus/theme-common';
import { type ReactNode, useEffect, useState } from 'react';
import { encodePlantUML } from '../../encoder';
import type { PlantumlConfig, ThemeConfig } from '../../theme-plantuml';

export interface PlantUMLProps {
  value: string;
}

type ColorMode = 'light' | 'dark';

function readColorMode(): ColorMode {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * Reads the color mode from the `data-theme` attribute that Docusaurus sets on `<html>`.
 * `useColorMode()` is avoided on purpose: when the consumer's package manager resolves
 * `@docusaurus/theme-common` (a peer dependency) to a different copy than the one providing
 * `<ColorModeProvider>`, the hook throws and breaks SSG (#45).
 * Returns 'light' during SSR and the first client render so that hydration matches.
 */
function useDocumentColorMode(): ColorMode {
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  useEffect(() => {
    setColorMode(readColorMode());
    const observer = new MutationObserver(() => setColorMode(readColorMode()));
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return colorMode;
}

/**
 * PlantUML diagram component.
 * Renders a PlantUML diagram using different server URLs for light and dark modes.
 */
function PlantUMLRenderer({ value }: PlantUMLProps): ReactNode {
  const colorMode = useDocumentColorMode();
  const docusaurusThemeConfig = useThemeConfig();
  const { plantuml }: ThemeConfig = docusaurusThemeConfig as ThemeConfig;
  const plantumlConfig: PlantumlConfig = plantuml || {
    serverUrlLight: 'https://www.plantuml.com/plantuml/svg/',
    serverUrlDark: 'https://www.plantuml.com/plantuml/dsvg/',
    debug: false,
  };
  if (plantumlConfig.debug) {
    console.log('[PlantUML] Theme config - plantuml:', plantuml);
  }
  const serverUrl =
    colorMode === 'dark' ? plantumlConfig.serverUrlDark : plantumlConfig.serverUrlLight;

  const trimmedCode = value.trim();
  const encoded = encodePlantUML(trimmedCode);
  const url = `${serverUrl}${encoded}`;

  return (
    <div className="plantUMLContainer">
      <img src={url} alt="PlantUML diagram" style={{ maxWidth: '100%' }} loading="lazy" />
    </div>
  );
}

export default function PlantUML(props: PlantUMLProps): ReactNode {
  return (
    <ErrorBoundary fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}>
      <PlantUMLRenderer {...props} />
    </ErrorBoundary>
  );
}
