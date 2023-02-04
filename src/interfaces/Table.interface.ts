import { IReportData, IDetailItem, IAttachFileInfo } from './ReportData.interface';
import type { RowClassNames } from '../enums/rowClassNames';
export interface IMainTableProps {
  _reporterOptions: IReportData['_reporterOptions'];
  testResults: IReportData['testResults'];
  config: IReportData['config'];
  globalExpandState: boolean;
  attachInfos?: IReportData['attachInfos'];
  logInfoMapping: IReportData['logInfoMapping'];
}

export interface IDetailTableItem extends IDetailItem {
  fileAttachInfos: IAttachFileInfo;
}

export interface IFormatCollapsibleItem  {
  tests: IDetailTableItem[];
  subTitle: string;
  subGroups: boolean;
  numFailingTests: number;
  numPassingTests: number;
  numPendingTests: number;
  numTodoTests: number;
}

export type IColumnsType = IDetailTableItem | IFormatCollapsibleItem;

export interface IDetailTableProps {
  data: IDetailTableItem[];
  defaultMerge: boolean;
  defaultMergeLevel: number;
}

export type ITableRowClassMap = {
  [key in RowClassNames]: {
    bgColor: string;
    hoverBgColor: string;
  }
}

