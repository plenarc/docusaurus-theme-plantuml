import type { Props } from '@theme/CodeBlock';
import ElementContent from '@theme/CodeBlock/Content/Element';
import StringContent from '@theme/CodeBlock/Content/String';
import PlantUML from '@theme/PlantUML';
import React, { isValidElement, type ReactNode } from 'react';

const validLangs = ['pumld', 'plantuml-diagram'];

function maybeStringifyChildren(children: ReactNode): ReactNode {
  if (React.Children.toArray(children).some((el: ReactNode) => isValidElement(el))) {
    return children;
  }
  return Array.isArray(children) ? children.join('') : (children as string);
}

export default function CodeBlock({ children: rawChildren, ...props }: Props): ReactNode {
  const children = maybeStringifyChildren(rawChildren);
  const language = props.className?.replace(/^language-/, '') || '';

  if (validLangs.includes(language)) {
    // When language is one of the valid PlantUML keywords, render the PlantUML component.
    return <PlantUML value={children as string} />;
  }

  // Fallback: render the original CodeBlock content.
  const CodeBlockComp = typeof children === 'string' ? StringContent : ElementContent;
  return <CodeBlockComp {...props}>{children as string}</CodeBlockComp>;
}
