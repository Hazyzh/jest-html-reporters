import React from 'react'
const TABLE_EXPAND = {
  expand: [],
  toggleExpand: () => {},
}

export const { Provider, Consumer } = React.createContext(TABLE_EXPAND)
