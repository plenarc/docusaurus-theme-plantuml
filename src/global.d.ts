// Docusaurus Virtual Module
declare module '@theme/CodeBlock' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
    readonly metastring?: string;
    readonly title?: string;
    readonly language?: string;
    readonly showLineNumbers?: boolean | number;
  }

  export default function CodeBlock(props: Props): ReactNode;
}

declare module '@theme/CodeBlock/Content/Element' {
  import type { ReactNode } from 'react';
  import type { Props } from '@theme/CodeBlock';
  export type { Props };
  export default function CodeBlockElementContent(props: Props): ReactNode;
}

declare module '@theme/CodeBlock/Content/String' {
  import type { ReactNode } from 'react';
  import type { Props } from '@theme/CodeBlock';
  export type { Props };
  export default function CodeBlockStringContent(props: Props): ReactNode;
}

declare module 'pako';
