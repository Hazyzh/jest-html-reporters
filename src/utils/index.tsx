import jump from 'jump.js';
import type { IExpandContext } from '../interfaces/Context.interface';
import type { IReportData } from '../interfaces/ReportData.interface';
import type {
  IDetailTableProps,
  IFormatCollapsibleItem,
  IDetailTableItem,
} from '../interfaces/Table.interface';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';


import { RowClassNames } from '../enums/rowClassNames';
import { TimeIcon } from './icons';
dayjs.extend(durationPlugin);

export const getExecutionResult = (
  testResult: IReportData['testResults'] = []
) => {
  try {
    const data = JSON.parse(JSON.stringify(testResult)) as IReportData['testResults'];
    data.forEach((item) => {
      const countDuration = item.testResults.reduce((pre, item) => {
        return pre + (item.duration ? item.duration : 0);
      }, 0);
      item.perfStats.runtime = countDuration;
      item.perfStats.end = item.perfStats.start + countDuration;
    });
    return data;
  } catch (err) {
    console.log(err);
    return testResult;
  }
};

export const getPercentage = (
  value: number,
  total: number,
  { precision = 2 }: { precision?: number } = {}
) => {
  const number = value / total;
  return (number * 100).toFixed(precision);
};

const OFFSET_HEIGHT = -10;
export function scrollTo(
  id: string,
  expandFunc: IExpandContext['toggleExpand'] = () => {}
) {
  const targetElement = document.getElementById(id);
  if (!targetElement) {
    return;
  }
  jump(targetElement, {
    duration: 500,
    offset: OFFSET_HEIGHT,
    callback: () => expandFunc({ key: id, state: true }),
    a11y: false,
  });
}

export const formatDate = (timestamp: number) =>
  new Date(timestamp - new Date().getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

export const getFormatData = (data: IReportData['testResults'] = []) => {
  return data
    .map(
      ({
        numFailingTests,
        numPassingTests,
        numPendingTests,
        testResults,
        testFilePath,
        perfStats: { end, start },
      }) => ({
        name: testFilePath,
        time: (end - start) / 1000,
        numFailingTests,
        numPassingTests,
        numPendingTests,
        testResults,
      })
    )
    .sort((a, b) => b.time - a.time);
};

const InsuranceNumber = (number: number, minLength = 2) => {
  const len = number.toString().length;
  if (len < minLength) {
    return '0'.repeat(minLength - len) + number;
  }
  return number;
};

export const getFormattedTime = (start: number, end: number) => {
  const duration = dayjs.duration(end - start);
  const hour = InsuranceNumber(duration.hours());
  const min = InsuranceNumber(duration.minutes());
  const sec = InsuranceNumber(duration.seconds());
  const msec = InsuranceNumber(duration.milliseconds(), 3);
  let node;
  if (hour !== '00') {
    node = `${hour}:${min}:${sec}.${msec}`;
  } else if (min !== '00') {
    node = `${min}:${sec}.${msec}`;
  } else if (sec !== '00') {
    node = `${min}:${sec}.${msec}`;
  } else {
    node = `${min}:${sec}.${msec}`;
  }
  return node;
};

export const formatCollapsibleData = (
  data: IDetailTableProps['data'],
  groupLevel = 1
): IFormatCollapsibleItem[] => {
  const ancestorMap = new Map<string, any>();
  const mySpecialText = '@@@@@Report@@@@@';
  const rootArray = [];
  data.forEach((item, index) => {
    const { ancestorTitles } = item;
    if (ancestorTitles.length < groupLevel) {
      rootArray.push(item);
    } else {
      const mapKey = ancestorTitles.slice(0, groupLevel).join(mySpecialText);
      ancestorMap.set(mapKey, [
        ...(ancestorMap.get(mapKey) || []),
        { ...item, ancestorTitles: item.ancestorTitles.slice(groupLevel) },
      ]);
    }
  });
  for (const ancestorKey of ancestorMap.keys() as any) {
    const tests = ancestorMap.get(ancestorKey) as IDetailTableItem[];
    const item = {
      rowKey: Math.random().toFixed(6),
      subTitle: ancestorKey.replace(new RegExp(mySpecialText, 'g'), ' => '),
      subGroups: true,
      tests,
      numFailingTests: tests.filter((item) => item.status === 'failed').length,
      numPassingTests: tests.filter((item) => item.status === 'passed').length,
      numPendingTests: tests.filter((item) => item.status === 'pending').length,
      numTodoTests: tests.filter((item) => item.status === 'todo').length,
    };
    rootArray.push(item);
  }
  return rootArray;
};

export const getFormatTimeDisplay = (start: number, end: number) => {
  const duration = dayjs.duration(end - start);
  const hour = InsuranceNumber(duration.hours());
  const min = InsuranceNumber(duration.minutes());
  const sec = InsuranceNumber(duration.seconds());
  const msec = InsuranceNumber(duration.milliseconds(), 3);
  let node;
  if (hour !== '00') {
    node = (
      <span className='time_active'>{`${hour}:${min}:${sec}.${msec}`}</span>
    );
  } else if (min !== '00') {
    node = <span className='time_active'>{`${min}:${sec}.${msec}`}</span>;
  } else if (sec !== '00') {
    node = (
      <span>
        <span className='time_minor'>{`${min}:`}</span>
        <span className='time_active'>{`${sec}.${msec}`}</span>
      </span>
    );
  } else {
    node = (
      <span>
        <span className='time_minor'>{`${min}:${sec}.`}</span>
        <span className='time_active'>{`${msec}`}</span>
      </span>
    );
  }
  return (
    <span className='time_box'>
      <TimeIcon />
      {node}
    </span>
  );
};

export const getRecordClass = (status: string, id: number) => {
  if (status === 'failed') return RowClassNames['row_failed'] + '-' + id;
  if (status === 'pending') return RowClassNames['row_pending'] + '-' + id;
  if (status === 'todo') return RowClassNames['row_todo'] + '-' + id;
  return '';
};

export const renderRootRowClass = (
  {
    numFailingTests,
    numPendingTests,
    numTodoTests,
    testExecError,
  }: any,
  id: number
) => {
  let status = '';
  if (testExecError) status = 'failed';
  else if (numFailingTests) status = 'failed';
  else if (numPendingTests) status = 'pending';
  else if (numTodoTests) status = 'todo';
  return getRecordClass(status, id);
};

export const getExistKeys = (obj = {}, globalExpandState: boolean) => {
  return Object.entries(obj)
    .filter((item) => globalExpandState || item[1])
    .map((item) => item[0]);
};

const callback = 'jest_html_reporters_callback__';
const RUNTIME: {lastPromise: null | Promise<any> } = {
  lastPromise: null,
};
export const fetchWithJsonp = (url: string) => {
  const lastPromise = RUNTIME.lastPromise;
  const promise = (async () => {
    try {
      // if there is already ongoing request, wait for it to be done
      // before replacing the window.__rc_config_data_callback__ function
      await lastPromise;
    } catch (error) {
      // ignore last error
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onerror = () => {
        document.body.removeChild(script);
        window[callback] = null;
        if (RUNTIME.lastPromise === promise) {
          RUNTIME.lastPromise = null;
        }
        reject(new Error(`'${url}' jsonp fetch failed`));
      };
      (window)[callback] = (data: IReportData) => {
        document.body.removeChild(script);
        (window)[callback] = null;
        if (RUNTIME.lastPromise === promise) {
          RUNTIME.lastPromise = null;
        }
        resolve(data);
      };
      document.body.appendChild(script);
    });
  })();
  RUNTIME.lastPromise = promise;
  return promise;
};