import { getOptions } from '../../helper'

describe('get options ', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV } // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV // restore old env
  })

  test('should return default option with no config', () => {
    const defaultOption = {
      publicPath: process.cwd(),
      filename: 'jest_html_reporters.html',
      expand: false,
      pageTitle: 'Report',
      logoImgPath: undefined,
      hideIcon: false,
      customInfos: undefined,
      testCommand: 'npx jest'
    };
    expect(getOptions()).toEqual(defaultOption)
  })

  test('env option should works for option', () => {
    const envOptions = {
      publicPath: './test',
      filename: 'file.html',
      expand: true,
      pageTitle: 'hello',
      logoImgPath: './logo.svg',
      hideIcon: true,
      customInfos: '{a: 1}',
      testCommand: 'yarn test'
    }
    process.env = {
      JEST_HTML_REPORTERS_PUBLIC_PATH: './test',
      JEST_HTML_REPORTERS_FILE_NAME: 'file.html',
      JEST_HTML_REPORTERS_EXPAND: true,
      JEST_HTML_REPORTERS_PAGE_TITLE: 'hello',
      JEST_HTML_REPORTERS_LOGO_IMG_PATH: './logo.svg',
      JEST_HTML_REPORTERS_HIDE_ICON: true,
      JEST_HTML_REPORTERS_CUSTOM_INFOS: '{a: 1}',
      JEST_HTML_REPORTERS_TEST_COMMAND: 'yarn test',
    }
    expect(getOptions()).toEqual(envOptions)
  })
})