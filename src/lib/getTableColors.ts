import type { GlobalToken } from 'antd/es/theme/interface';
import { ITableRowClassMap } from '../interfaces/Table.interface';
import { RowClassNames } from '../enums/rowClassNames';

export const getTableColors = (token: GlobalToken): ITableRowClassMap => {
  const {
    // failed
    colorErrorBg,
    colorErrorOutline,
    // pending
    colorWarningBg,
    colorWarningBgHover,
    // colorTodo
    colorInfoBg,
    colorInfoBgHover,
  } = token;
  return {
    [RowClassNames['row_failed']]: {
      bgColor: colorErrorBg,
      hoverBgColor: colorErrorOutline,
    },
    [RowClassNames['row_pending']]: {
      bgColor: colorWarningBg,
      hoverBgColor: colorWarningBgHover,
    },
    [RowClassNames['row_todo']]: {
      bgColor: colorInfoBg,
      hoverBgColor: colorInfoBgHover,
    },
  };
};
