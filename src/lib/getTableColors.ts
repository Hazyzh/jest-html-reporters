import type { GlobalToken } from 'antd/es/theme/interface';
import { ITableRowClassMap } from '../interfaces/Table.interface';
import { RowClassNames } from '../enums/rowClassNames';

export const getTableColors = (token: GlobalToken): ITableRowClassMap => {
  const {
    // failed
    colorErrorBorder,
    colorErrorTextHover,
    // pending
    colorWarningBorder,
    colorWarningBorderHover,
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
      bgColor: colorWarningBorder,
      hoverBgColor: colorWarningBorderHover,
    },
    [RowClassNames['row_todo']]: {
      bgColor: colorInfoBg,
      hoverBgColor: colorInfoBgHover,
    },
  };
};
