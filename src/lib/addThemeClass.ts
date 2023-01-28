import type { GlobalToken } from 'antd/es/theme/interface';
import { getTableColors } from './getTableColors';
import { RowClassNames } from '../enums/rowClassNames';
type RowKeys = keyof typeof RowClassNames;

const idMap = new Map<number, boolean>();

export const addThemeClass = (token: GlobalToken, id: number) => {
  if (idMap.get(id)) return;
  const code = generateCode(token, id);
  addStyle(code);
  idMap.set(id, true);
};

const generateCode = (token: GlobalToken, id: number) => {
  const colorsMap = getTableColors(token);

  return (Object.keys(RowClassNames) as RowKeys[]).map(
    (key) => `
      .${RowClassNames[key]}-${id} {
        background: ${colorsMap[key].bgColor};
      }
      .${RowClassNames[key]}-${id}:hover td {
        background: ${colorsMap[key].hoverBgColor} !important;
      }
    `
  ).join('\n');
};

const addStyle = (code: string) => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = code;
  document.getElementsByTagName('head')[0].appendChild(style);
};
