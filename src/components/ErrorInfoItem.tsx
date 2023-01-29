import React from 'react';
import { theme } from 'antd'
import Convert from 'ansi-to-html';
import escapeHtml from 'escape-html';

interface ConverterOptions {
  /** The default foreground color used when reset color codes are encountered. */
  fg?: string
  /** The default background color used when reset color codes are encountered. */
  bg?: string
}

const createMarkup = (text: string, convertOptions: ConverterOptions) => {
  const convert = new Convert(convertOptions);
  return  ({
    __html: convert.toHtml(escapeHtml(text)),
  });
  
}
const ErrorInfoItem = ({ data }: { data: string | undefined }) => {
  const { token } = theme.useToken();
  const { colorText, colorBgElevated } = token;
  const options = {
    fg: colorText,
    bg: colorBgElevated,
  }
  if (!data) return null;
  return (
    <pre
      data-sign='ErrorInfoItem'
      className='error_pre'
      dangerouslySetInnerHTML={createMarkup(data, options)}
      style={{ padding: '10px' }}
    />
  );
};

export default ErrorInfoItem;
