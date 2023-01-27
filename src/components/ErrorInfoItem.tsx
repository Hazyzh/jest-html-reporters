import React from 'react';

import Convert from 'ansi-to-html';
import escapeHtml from 'escape-html';

const convert = new Convert({
  fg: '#595959',
});

const createMarkup = (text: string) => ({
  __html: convert.toHtml(escapeHtml(text)),
});

const ErrorInfoItem = ({ data }: { data: string | undefined }) => {
  if (!data) return null;
  return (
    <pre
      data-sign='ErrorInfoItem'
      dangerouslySetInnerHTML={createMarkup(data)}
      style={{ padding: '10px' }}
    />
  );
};

export default ErrorInfoItem;
