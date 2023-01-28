import type { GlobalToken } from 'antd/es/theme/interface';
import { ITableRowClassMap } from '../interfaces/Table.interface';
import { RowClassNames } from '../enums/rowClassNames';

export const getTableColors = (token: GlobalToken): ITableRowClassMap => {
  const {
    // failed
    colorErrorBorder,
    colorErrorTextHover,
    // pending
    colorWarningBg,
    colorWarningBgHover,
    // colorTodo
    colorInfoBg,
    colorInfoBgHover,
  } = token;
  return {
    [RowClassNames['row_failed']]: {
      bgColor: colorErrorBorder,
      hoverBgColor: colorErrorTextHover,
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
