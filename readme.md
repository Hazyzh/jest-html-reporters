### Jest reporter

[![npm](https://img.shields.io/npm/v/jest-html-reporters.svg)](https://www.npmjs.com/package/jest-html-reporters)
[![NPM downloads](http://img.shields.io/npm/dm/jest-html-reporters.svg)](http://npmjs.com/jest-html-reporters)
[![license](https://img.shields.io/npm/l/jest-html-reporters.svg)](https://www.npmjs.com/package/jest-html-reporters)

Jest test results processor for generating a summary in HTML

![example picture](./show.gif)

### Installation

---

```shell
  npm install jest-html-reporters --save-dev
```

### Usage

---

Configure Jest to process the test results by adding the following entry to the Jest config (jest.config.json):

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

As you run Jest from within the terminal, a file called `jest_html_reporters.html` will be created within your root folder containing information about your tests.

### Available Options

The options below are specific to the reporter.

| Option Name   | env variables name                | Type    | Default                  | Description                                                                                                                                                                                                                                                                                          |
| :------------ | :-------------------------------- | :------ | :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `publicPath`  | JEST_HTML_REPORTERS_PUBLIC_PATH   | string  | ''                       | specify the base path                                                                                                                                                                                                                                                                                |
| `filename`    | JEST_HTML_REPORTERS_FILE_NAME     | string  | jest_html_reporters.html | Filename of saved report <br> _Applies to the generated html_                                                                                                                                                                                                                                        |
| `expand`      | JEST_HTML_REPORTERS_EXPAND        | Boolean | false                    | specify whether default expand all data                                                                                                                                                                                                                                                              |
| `pageTitle`   | JEST_HTML_REPORTERS_PAGE_TITLE    | string  | Report                   | specify header and page title                                                                                                                                                                                                                                                                        |
| `logoImgPath` | JEST_HTML_REPORTERS_LOGO_IMG_PATH | string  | undefined                | specify path of the image that will be displayed to the right of page title                                                                                                                                                                                                                          |
| `hideIcon`    | JEST_HTML_REPORTERS_HIDE_ICON     | Boolean | false                    | hide default icon                                                                                                                                                                                                                                                                                    |
| `customInfos` | JEST_HTML_REPORTERS_CUSTOM_INFOS  | array   | undefined                | show some custom data info in the report, example value `[ {title: 'test1', value: 'test1'}, {title: 'test2', value: 'test2'}]`, you can also set value to a environment variable **JEST_HTML_REPORTERS_CUSTOM_INFOS**, see detail in [#32](https://github.com/Hazyzh/jest-html-reporters/issues/32) |
| `testCommand` | JEST_HTML_REPORTERS_TEST_COMMAND  | string  | "npx jest"               | copy command content to quickly run test file                                                                                                                                                                                                                                                        |

---

#### example add config options

```json
...,
"reporters": [
  "default",
  ["jest-html-reporters", {
    "publicPath": "./html-report",
    "filename": "report.html",
    "expand": true
  }]
]
```

---

### 2.x updates

- Collapsable Test Groups

This feature regrading to [#37](https://github.com/Hazyzh/jest-html-reporters/issues/37), if a test file has many test cases, here will show a Merge Data checkbox on the expanded table. You can check it to merge data and set the merge level to control how to combine those data.

For Example
![merge data example](https://user-images.githubusercontent.com/21355783/84232424-d2acd000-ab22-11ea-8929-36c90a6c36ee.png)

- Attach screenshot to report

This feature regrading to [#36](https://github.com/Hazyzh/jest-html-reporters/issues/36), this package will a new method named `addAttach`.

```
/**
 *
 * @param {Buffer | string} attach
 * @param {string} description of the picture
 */
const addAttach = async (attach, description) => { ... }
```

There are two params of this method, `description` is easy to understand. The param **`attach`** referring to the image, you can pass a `buffer` or `string`, if it was a buffer the package will help you create a dir named `jest-html-reporters-attach` and save that `buffer` as a `jpg` image in it under the `publicPath`. if you have already saved the image, just pass the image's path as the `attach` param.
Here is an Example with [puppeteer](https://github.com/puppeteer/puppeteer).

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
    await addAttach(data, "test google 1");

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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const filePath = path.resolve(__dirname, "./test.jpg");
    await page.goto("https://www.google.com");
    const data = await page.screenshot({ path: filePath });
    await browser.close();
    await addAttach(filePath, "test google 2");

    expect(1).toBe(2);
  });
});
```

it will show like this
![example](./attach-example.jpg)

- Attach a message to the report

This feature is in regards to [#63](https://github.com/Hazyzh/jest-html-reporters/issues/63) & [#64](https://github.com/Hazyzh/jest-html-reporters/issues/64). It allows you to add a message or log something to the html report with `addMsg()`

```
/**
 *
 * @param {string} message
 */
const addMsg = async (message) => { ... }
```

Only one parameter is required. If you stringify an object like this `JSON.stringify(object, null, 2)`, the object will be prettified

Here is an Example with [Nightmare](https://www.npmjs.com/package/nightmare).

```javascript
const { addAttach, addMsg } = require("jest-html-reporters/helper");
const Nightmare = require("nightmare");

describe("Yet another example", () => {
  test("Both addAttach & addMsg with failure", async () => {
    const nightmare = Nightmare({ show: true });
    await addMsg(JSON.stringify({ won: 1, too: 2 }, null, 2));
    await nightmare.goto("https://duckduckgo.com");
    const s1 = await nightmare.screenshot();
    await addAttach(s1, "test duckduckgo 1");
    await nightmare.end();
    await addMsg(JSON.stringify(process, null, 2));
    expect(2).toEqual(1);
  }, 20000);
  test("addMsg with success", async () => {
    await addMsg(JSON.stringify({ free: 3, for: 4 }, null, 2));
    expect(2).toEqual(2);
  });
});
```

![example](./addMsg-example1.jpg)

Message still displays without screenshots and with a successful test
![example](./addMsg-example2.jpg)
