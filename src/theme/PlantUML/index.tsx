import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  ErrorBoundaryErrorMessageFallback,
  useColorMode,
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
  // Use different server URLs based on the color mode.
  const serverUrl =
    colorMode === 'dark'
      ? 'https://www.plantuml.com/plantuml/dsvg/'
      : 'https://www.plantuml.com/plantuml/svg/';
  const trimmedCode = value.trim();
  const encoded = encodePlantUML(trimmedCode);
  const url = `${serverUrl}${encoded}`;

  return (
    <div className="plantUMLContainer">
      <img
        src={url}
        alt="PlantUML diagram"
        style={{ maxWidth: '100%' }}
        loading="lazy"
      />
    </div>
  );
}

export default function PlantUML(props: PlantUMLProps): ReactNode {
  return (
    <ErrorBoundary
      fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}
    >
      <PlantUMLRenderer {...props} />
    </ErrorBoundary>
  );
}
