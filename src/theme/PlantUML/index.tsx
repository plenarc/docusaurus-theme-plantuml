import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  ErrorBoundaryErrorMessageFallback,
  useColorMode,
  useThemeConfig,
} from '@docusaurus/theme-common';
import type { ReactNode } from 'react';
import { encodePlantUML } from '../../encoder';

export interface PlantUMLProps {
  value: string;
}

/**
 * PlantUML diagram component.
 * Renders a PlantUML diagram using different server URLs for light and dark modes.
 */
function PlantUMLRenderer({ value }: PlantUMLProps): ReactNode {
  const { colorMode } = useColorMode();
  const themeConfig = useThemeConfig();
  console.log('[PlantUML] Theme config:', themeConfig); // debug
  // The structure of the theme configuration to be retrieved matches that defined in validateThemeConfig.
  const plantumlConfig = (themeConfig as any).plantuml || {};
  const serverUrlLight = plantumlConfig.serverUrlLight || 'https://www.plantuml.com/plantuml/svg/';
  const serverUrlDark = plantumlConfig.serverUrlDark || 'https://www.plantuml.com/plantuml/dsvg/';
  console.log('[PlantUML] Theme config details:', { serverUrlLight, serverUrlDark, colorMode }); // debug
  const serverUrl = colorMode === 'dark' ? serverUrlDark : serverUrlLight;

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
