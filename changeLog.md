### 1.0.8

- Add auto expand of mian table when scroll

  when scrollto a row, the row will expand automatically,so can more easy find the row's position.

- Add clipboard feature in main table

  you can click copy icon to copy path to clipboard in main table.

### 1.0.9

- add feature of customize file name and file path

  you can config to generate reporter anywhere you want

- add icon for information board

- click dashboard card can scroll to corresponding test

  when there has error click the dashboard card can easy find the row's position.

### 1.1.1

- add footer of the page.

### 1.1.2

- add start time info in information board.

### 1.1.4

- fix bug [ignore empty public path when create `#5`].

### 1.1.5

- fix bug [fixing typo `Passd` -> `All Passed` `#8`].
- Nested describes [Separate tests by their respective `describe` blocks `#9`].

### 1.1.6

- add expand all feature.

### 1.1.8

- add support display`todo` test.

### 1.1.9

- add custom header/title for report.

### 1.2.0

- add custom logo for report.

### 1.2.1

- add the ability to show custom Infos in report.

### 2.0.0

- add collapsible Test Groups feature.
- add attach screenshot to report feature.

### 2.0.4

- add custom command feature.
- add env config for all option.

### 2.1.0

- add multiple result unite report support

### 2.1.1

- change chart tooltip and labels (community contribute)
- empty header when there is no config (community contribute)
- custom *context* to addAttach and addMsg(community contribute)

### 2.1.2

- custom temp dir path (community contribute)

### 2.1.3

- open browser and show link to coverage (community contribute)
- fix custom info parse issue
- add case info to error popup

### 2.1.4

- show failure test suites messages only in HTML report (community idea)

### 2.1.5

- use system's temp dir for attach temp folder (community idea)
- merge feature and merge level config option (community idea)
- support attach log for before all hook (community idea)

### 2.1.6

- fix table can not expend issue.

### 3.0.1

- remove multiple related logic.
- fix multiple user test temp dir error issue.
- Add hour data while displaying time duration.
- using ts for index file to generate d.ts file.
- Added fourth option to `addAttach` to allow specifying attachment filetype. 
- refactor helper `addAttach` and `addMsg` function, using object as a parameters.
- refactor build script, remove inline `script` code.
- add html support for custom info section.

### 3.0.2

- fix bug fix: 🐛 fix resource dir overwrite issue when multiple project(#180).

### 3.0.4

- support global root dir variable.

### 3.0.6

- support inline resource option (community required).
- fix message layout issue.
- fix coverage report path error issue.

### 3.0.7

- deep clone result.
- fix add message display style.
- fix addMsg type.

### 3.0.8

- add case exec time count toggle button.

### 3.0.9

- fix inlineSource create dir issue.
- improve failureMessageOnly option to support not create report request.

### 3.0.10

- add a test file link to each row (community contribute).

### 3.0.11

- fix: apply break-word to each table cell by @nissy-dev in https://github.com/Hazyzh/jest-html-reporters/pull/227
-  fix: report fails on circular object clone by @OleksandrMartyniuk in https://github.com/Hazyzh/jest-html-reporters/pull/230

### 3.0.12

* Fix long path names causing table overflow by @danielduong8 in https://github.com/Hazyzh/jest-html-reporters/pull/251
* Add check context[key] is defined before accessing it. by @devinea in https://github.com/Hazyzh/jest-html-reporters/pull/252

### 3.1.0

* Support Dark Theme. by @Hazyzh in https://github.com/Hazyzh/jest-html-reporters/pull/254
* bump package version, using create react app to build resource by @Hazyzh in https://github.com/Hazyzh/jest-html-reporters/pull/255

