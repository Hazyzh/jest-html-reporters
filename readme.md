### Jest reporter

Jest test results processor for generating a summary in HTML

![example picture](./show.gif)

### Installation

---

```shell
  npm install jest-html-reporters --save-dev
```

### Usage
----
Configure Jest to process the test results by adding the following entry to the Jest config (jest.config.json):
```json
"reporters": [
  "default",
  "./node_modules/jest-html-reporters"
]
```
As you run Jest from within the terminal, a file called `jest_html_reporters.html` will be created within your root folder containing information about your tests.

### todos

[Todos:](https://github.com/Hazyzh/jest-html-reporters/issues/1)
