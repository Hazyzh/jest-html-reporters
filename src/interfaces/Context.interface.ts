

export interface IExpandContext {
  expand: Record<string, boolean>;
  toggleExpand: (params: { key: string; state: boolean; }) => void;
}
