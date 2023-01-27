import { IExpandContext } from './Context.interface';

export interface ICardsListItem {
  title: number;
  content: string;
  label?: string;
  labelColor?: string;
  clickHandler?: (func: IExpandContext['toggleExpand']) => void;
}