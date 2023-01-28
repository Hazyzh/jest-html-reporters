interface Window {
  realData: any;
  jest_html_reporters_callback__: any;
}

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export { ReactComponent };
}
