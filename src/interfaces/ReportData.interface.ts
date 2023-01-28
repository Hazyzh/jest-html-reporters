import type {
  AggregatedResult,
  TestResult,
  AssertionResult,
} from '@jest/test-result';
import type { Config } from '@jest/types';

export interface IAttachInfosItem {
  filePath: string;
  description: string;
  createTime: number;
  extName: string;
}

export interface IAttachFileInfo {
  [attachMappingName: string]: IAttachInfosItem[];
}

export interface IAttachInfos {
  [testPath: string]: IAttachFileInfo;
}

interface IReportOptions {
  publicPath: string;
  filename: string;
  expand: boolean;
  hideIcon: boolean;
  openReport: boolean;
  failureMessageOnly: boolean;
  enableMergeData: boolean;
  dataMergeLevel: number;
  customInfos?: { title: string; value: string }[];
  pageTitle?: string;
  testCommand?: string;
  logoImg?: string;
  urlForTestFiles?: string;
  darkTheme?: boolean;
}

export interface IReportData extends AggregatedResult {
  config: Config.GlobalConfig & { coverageLinkPath?: string };
  endTime: number;
  _reporterOptions: IReportOptions;
  // todo add type here.
  attachInfos?: IAttachInfos;
}

export type ITestItem = TestResult;

export type IDetailItem = AssertionResult;
