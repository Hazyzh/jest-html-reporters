### Jest reporter

[![npm](https://img.shields.io/npm/v/jest-html-reporters.svg)](https://www.npmjs.com/package/jest-html-reporters)
[![NPM downloads](http://img.shields.io/npm/dm/jest-html-reporters.svg)](http://npmjs.com/jest-html-reporters)
[![license](https://img.shields.io/npm/l/jest-html-reporters.svg)](https://www.npmjs.com/package/jest-html-reporters)

[English](../readme.md) | 简体中文

这个一个Jest reporter插件，用Jest的测试结果来生成静态静态HTML报告页面。

效果页面 https://hazyzh.github.io/report.html

![example picture](../readmeStatic/show.gif)

### 安装

---

```shell
  # yarn
  yarn add jest-html-reporters --dev
  # npm
  npm install jest-html-reporters --save-dev
```

### 使用

---

可以通过以下Jest配置,使用当前插件去生成测试结果页 (`jest.config.json`):

```json
"jest": {
  ...,
  "reporters": [
    "default",
    "jest-html-reporters"
  ],
  ...
}

```
当你在终端跑完Jest测试后，会在根目录下生成一个名字叫做`jest_html_reporters.html`的文件，打开这个页面就可以看到对应的结果信息。

### 可选配置项

下列参数是当前reporter的可选配置项.

| 参数名称|  类型         | 默认值 | 描述  |环境变量名称 |
| :------------------------- | :--------- | :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| `publicPath`               |  string  | '' | 生成文件的根目录 | JEST_HTML_REPORTERS_PUBLIC_PATH  |
| `filename`                 |  string  | jest_html_reporters.html | 生产文件的文件名 <br> 例如`report.html` | JEST_HTML_REPORTERS_FILE_NAME  | 
| `includeConsoleLog`       | boolean   | false | 设置为`true`可以把console logs 信息包含在测试结果中 **注意:** 前提条件是在运行jest 测试时候确保 `--verbose=false` 使得可在测试过程中拿到console log信息.|JEST_HTML_REPORTERS_INCLUDE_CONSOLE_LOG  |
| `darkTheme`               | boolean   | false    | 可以配置是否默认使用黑暗模式|JEST_HTML_REPORTERS_DARK_THEME |
| `failureMessageOnly`       |  number  | 0 | **0** : 总是创建报告文件。  <br>**1** : 在报告页面里只展示错误的测试。  <br>**2** : 只有有测试失败时候才回去创建测试结果页。| JEST_HTML_REPORTERS_FAILURE_MESSAGE_ONLY | 
| `inlineSource`             | boolean | false |  生成所有内容到一个单独的html文件中 [#184](https://github.com/Hazyzh/jest-html-reporters/issues/184) | JEST_HTML_REPORTERS_INLINE_SOURCE |
| `pageTitle`                |  string  | Report | 指定页面标题以及header栏里展示的标题 |JEST_HTML_REPORTERS_PAGE_TITLE |
| `logoImgPath`              |  string  | undefined| logo图片的相对路径，会在页面左上角展示。|JEST_HTML_REPORTERS_LOGO_IMG_PATH |
| `hideIcon`                 |  boolean | false | 隐藏左上角的GitHub 图标 | JEST_HTML_REPORTERS_HIDE_ICON |
| `expand`                   |  boolean | false | 标记是否展开所有测试文件，默认关闭 |JEST_HTML_REPORTERS_EXPAND|
| `testCommand`              |  string  | "" | 页面内可复制测试路径，这里可以给复制的信息前面加一些自定义参数。| JEST_HTML_REPORTERS_TEST_COMMAND | 
| `openReport`               |  json    | in dev=true, rest=false |  是否自动打开测试结果页面 |JEST_HTML_REPORTERS_OPEN_REPORT |
| `urlForTestFiles`          | string  | ''          |  测试文件的 url。 如果用户设置此值，详细信息表会显示指向每一行的图标链接。 该链接是通过为每个测试加入 urlForTestFiles 和 relativePath（如 `/src/utils/index.test.js`）来构建的。 参考 [#221](https://github.com/Hazyzh/jest-html-reporters/issues/221)|JEST_HTML_REPORTERS_URL_FOR_TEST_FILES  |
| `customInfos`              |  array   | undefined | 展示一些自定义的信息,例如 `[ {title: 'test1', value: 'test1'}, {title: 'test2', value: 'test2'}]`, you can also set value to a environment variable **JEST_HTML_REPORTERS_CUSTOM_INFOS**, 可用参考 [#32](https://github.com/Hazyzh/jest-html-reporters/issues/32) |JEST_HTML_REPORTERS_CUSTOM_INFOS |
| `enableMergeData`          | boolean  | false | 是否合并测试文件内数据 | JEST_HTML_REPORTERS_ENABLE_MERGE_DATA |
| `dataMergeLevel`           | number   | 1  |  合并数据的级别 |JEST_HTML_REPORTERS_DATA_MERGE_LEVEL  | 
| 此配置只支持环境变量参数       |  string  | system default temporary directory | 临时文件存放路径 |JEST_HTML_REPORTERS_TEMP_DIR_PATH |
---

#### 添加report配置的例子

```json
...,
"reporters": [
  "default",
  ["jest-html-reporters", {
    "publicPath": "./html-report",
    "filename": "report.html",
    "openReport": true
  }]
]
```

---

### some features.

- 折叠测试组

 如果一个测试文件有很多测试用例，这里会在展开的表格上显示一个合并数据复选框 . 您可以检查它以合并数据并设置合并级别以控制如何组合这些数据。[#37](https://github.com/Hazyzh/jest-html-reporters/issues/37).

例如
![merge data example](https://user-images.githubusercontent.com/21355783/84232424-d2acd000-ab22-11ea-8929-36c90a6c36ee.png)

- 添加一些文件（例如截图）在测试报告中

这个功能是关于[#36](https://github.com/Hazyzh/jest-html-reporters/issues/36), 这里提供一个`addAttach`的方法.

```
interface IAddAttachParams {
    attach: string | Buffer;
    description: string;
    context: any;
    bufferFormat: string;
}
```

该方法一共有三个参数，`description`简单易懂。 参数 **`attach`** 指的是图像，你可以传递一个 `buffer` 或 `string`，如果它是buffer，该包将帮助您创建一个名为 `jest-html-reporters-attach` 的目录并且 在 `publicPath` 下将该 `buffer` 保存为 `jpg` 图像。 如果您已经保存了图像，只需将图像的路径作为 attach 参数传递即可。
`context` 是可选参数。 这里可以指定**context**（默认是this.global）。

这个是使用 [puppeteer](https://github.com/puppeteer/puppeteer) 的一个例子.

```javascript
// Example attach with **buffer**
const { addAttach } = require("jest-html-reporters/helper");
const puppeteer = require("puppeteer");

describe("just examples", () => {
  test("test buffer", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.google.com");
    const data = await page.screenshot();
    await browser.close();
    await addAttach({
      attach: data,
      description: 'img 1',
    });
    await addAttach({
      attach: await fs.readFileSync('./test.mp4'),
      description: 'img 1',
      bufferFormat: 'mp4',
    });
    expect(1).toBe(1);
  });
});
```

```javascript
// Example attach with **string**
const { addAttach } = require("jest-html-reporters/helper");
const puppeteer = require("puppeteer");
const path = require("path");

describe("just examples", () => {
  test("case string", async () => {
    const filePath = path.resolve(__dirname, "./test.jpg");
    await browser.close();
    await addAttach({
      attach: filePath,
      description: 'test google 2',
    });

    await addAttach({
      attach: 'www.example.com/test.mp4',
      description: 'test video 2',
    });
    expect(1).toBe(2);
  });
});
```

测试结果将会
![example](../readmeStatic/attach-example.jpg)

- 添加日志信息

此功能关于 [#63](https://github.com/Hazyzh/jest-html-reporters/issues/63) 和 [#64](https://github.com/Hazyzh/jest-html-reporters/issues/63)。 它允许您使用 addMsg() 向 html 报告添加消息或记录内容

```
/**
 * @param {object} options - options object
 * @param {string} options.message - message string
 * @param {any} [options.context] - custom context (optional)
 */
const addMsg = async ({ message, context }) => { ... }
```

只需要一个参数。 如果像这样 `JSON.stringify(object, null, 2)` 将对象字符串化，该对象将被美化。
`context` 是可选参数。 这里可以指定**context**（默认是this.global）。

这是一个使用 [Nightmare](https://www.npmjs.com/package/nightmare) 的例子.

```javascript
const { addAttach, addMsg } = require("jest-html-reporters/helper");
const Nightmare = require("nightmare");

describe("Yet another example", () => {
  test("Both addAttach & addMsg with failure", async () => {
    const nightmare = Nightmare({ show: true });
    await addMsg({ message: JSON.stringify({ won: 1, too: 2 }, null, 2) });
    await nightmare.goto("https://duckduckgo.com");
    const s1 = await nightmare.screenshot();
    await addAttach(s1, "test duckduckgo 1");
    await nightmare.end();
    await addMsg({ message: JSON.stringify(process, null, 2) });
    expect(2).toEqual(1);
  }, 20000);
  test("addMsg with success", async () => {
    await addMsg({ message: JSON.stringify({ free: 3, for: 4 }, null, 2) });
    expect(2).toEqual(2);
  });
});
```

![example](../readmeStatic/addMsg-example1.jpg)

![example](../readmeStatic/addMsg-example2.jpg)

- 展示文件连接在测试结果中

如果用户为 urlForTestFiles 设置了一些值，详细信息表会显示指向每一行的图标链接。 该链接是通过连接 urlForTestFiles（例如：`https://github.com/Hazyzh/jest-html-reporters/blob/master`）和 relativePath（例如：`/src/utils/index.test.js`）构建的 对于每个测试。

![Details Table shows an icon link to each rows.](../readmeStatic/show_a_link_for_each_test_file.png)
