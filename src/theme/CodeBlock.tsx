import React from 'react';
import type { Props } from '@theme/CodeBlock';
import { encodePlantUML } from 'plugin-docusaurus-plantuml/lib/encoder'; // 適切なパスに調整してください

// Valid language keywords for PlantUML rendering.
const validLangs = ['pumld', 'plantuml-diagram'];

export default function CodeBlock(props: Props): JSX.Element {
  // Extract the language from the className, e.g. "language-pumld"
  const language = props.className?.replace(/^language-/, '') || '';

  if (validLangs.includes(language)) {
    // Get the raw code content (children might be an array or string)
    const code =
      Array.isArray(props.children) ? props.children.join('') : props.children;
    const trimmedCode = code.trim();
    const encoded = encodePlantUML(trimmedCode);
    // Use a default PlantUML server; you could also make this configurable.
    const serverUrl = 'https://www.plantuml.com/plantuml/svg/';
    const url = `${serverUrl}${encoded}`;
    return (
      <div className="plantuml-diagram">
        <img src={url} alt="PlantUML diagram" style={{ maxWidth: '100%' }} loading="lazy" />
      </div>
    );
  }

  // Fallback: Render the default CodeBlock component for other languages.
  // @theme-original/CodeBlock は Docusaurus の元のコンポーネントです。
  const DefaultCodeBlock = require('@theme-original/CodeBlock').default;
  return <DefaultCodeBlock {...props} />;
}
