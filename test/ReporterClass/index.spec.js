import { getOptions, replaceRootDirVariable } from '../../helper';

describe('get options ', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  test('should return default option with no config', () => {
    const defaultOption = {
      publicPath: process.cwd(),
      filename: 'jest_html_reporters.html',
      expand: false,
      pageTitle: '',
      logoImgPath: undefined,
      hideIcon: false,
      customInfos: undefined,
      failureMessageOnly: 0,
      openReport: false,
      testCommand: '',
      enableMergeData: false,
      dataMergeLevel: 1,
      inlineSource: false,
      urlForTestFiles: '',
      darkTheme: false,
      includeConsoleLog: false,
    };
    expect(getOptions()).toEqual(defaultOption);
  });

  test('env option should works for option', () => {
    const envOptions = {
      publicPath: './test',
      filename: 'file.html',
      expand: true,
      pageTitle: 'hello',
      logoImgPath: './logo.svg',
      hideIcon: true,
      customInfos: '{a: 1}',
      testCommand: 'yarn test',
      openReport: false,
      failureMessageOnly: 0,
      enableMergeData: false,
      dataMergeLevel: 1,
      inlineSource: true,
      urlForTestFiles:
        'https://github.com/Hazyzh/jest-html-reporters/tree/master',
      darkTheme: false,
      includeConsoleLog: false,
      stripSkippedTest: false,
    };
    process.env = {
      JEST_HTML_REPORTERS_PUBLIC_PATH: './test',
      JEST_HTML_REPORTERS_FILE_NAME: 'file.html',
      JEST_HTML_REPORTERS_EXPAND: true,
      JEST_HTML_REPORTERS_PAGE_TITLE: 'hello',
      JEST_HTML_REPORTERS_LOGO_IMG_PATH: './logo.svg',
      JEST_HTML_REPORTERS_HIDE_ICON: true,
      JEST_HTML_REPORTERS_CUSTOM_INFOS: '{a: 1}',
      JEST_HTML_REPORTERS_TEST_COMMAND: 'yarn test',
      JEST_HTML_REPORTERS_INLINE_SOURCE: true,
      JEST_HTML_REPORTERS_URL_FOR_TEST_FILES:
        'https://github.com/Hazyzh/jest-html-reporters/tree/master',
    };
    expect(getOptions()).toEqual(envOptions);
  });
});

describe('test replaceRootDirVariable function', () => {
  test.each`
    publicPath                                      | rootDirPath       | result
    ${'<rootDir>/html-report'}                      | ${'/Users/harry'} | ${'/Users/harry/html-report'}
    ${'./html-report'}                              | ${'/Users/harry'} | ${'./html-report'}
    ${'/html-report/<rootDir>'}                     | ${'/Users/harry'} | ${'/html-report/<rootDir>'}
    ${'<rootDir>/html-report<rootDir>/html-report'} | ${'/Users/harry'} | ${'/Users/harry/html-report<rootDir>/html-report'}
  `('should return correct value', ({ publicPath, rootDirPath, result }) => {
    const execResult = replaceRootDirVariable(publicPath, rootDirPath);
    expect(execResult).toBe(result);
  });
});
