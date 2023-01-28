import React from 'react';
import { IExpandContext } from '../interfaces/Context.interface';

const TABLE_EXPAND = {
  expand: {},
  toggleExpand: () => {},
};

export const ExpandContext = React.createContext<IExpandContext>(TABLE_EXPAND);
