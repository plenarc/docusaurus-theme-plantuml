import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  ErrorBoundaryErrorMessageFallback,
  useColorMode,
  useThemeConfig,
} from '@docusaurus/theme-common';
import type { ReactNode } from 'react';
import { encodePlantUML } from '../../encoder';
import type { PlantumlConfig, ThemeConfig } from '../../theme-plantuml';

export interface PlantUMLProps {
  value: string;
}

/**
 * PlantUML diagram component.
 * Renders a PlantUML diagram using different server URLs for light and dark modes.
 */
function PlantUMLRenderer({ value }: PlantUMLProps): ReactNode {
  const { colorMode } = useColorMode();
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
