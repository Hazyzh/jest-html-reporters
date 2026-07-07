# jest-html-reporters Agent Guide

This directory contains project guidance for future AI agents working in this
repository. Prefer the skill under `.agents/skills/project-maintenance/` when a
task involves code changes, issue triage, pull request preparation, or release
checks.

## Project Summary

`jest-html-reporters` is a Jest reporter that generates an HTML test report.
It has two main runtime surfaces:

- The reporter entry point, compiled from `index.ts` to `index.js`.
- The helper API, compiled from `helper.ts` to `helper.js`, used by tests as
  `jest-html-reporters/helper` for `addAttach` and `addMsg`.

The repository also contains a React/Ant Design report UI under `src/`, build
scripts adapted from Create React App, Jest tests, and package metadata for npm
publishing.

## Important Files And Directories

- `index.ts`: Jest reporter implementation. It receives Jest results, reads
  helper attachment metadata, prepares report data, writes `result.js` or an
  inline HTML file, and optionally opens the generated report.
- `helper.ts`: public helper API for test code. It stores attachment/message
  metadata in the reporter temp directory for `index.ts` to read later.
- `src/`: React UI for rendering the generated report.
  - `src/components/`: dashboard, main/detail tables, error/info modal, footer.
  - `src/interfaces/`: report data and table type definitions.
  - `src/utils/`: formatting, table grouping, scrolling, JSONP loading helpers.
  - `src/styles/`: SCSS styling for the report UI.
- `config/`: webpack, Jest transform, env, path, and dev-server configuration.
- `scripts/`: project build/test wrappers.
  - `scripts/build.js`: builds the frontend report assets into `dist/`.
  - `scripts/test.js`: runs Jest.
  - `scripts/verifyPackageFiles.js`: validates package metadata file entries.
- `build/tsconfig.json`: TypeScript config used to compile `index.ts` and
  `helper.ts` into root JS and declaration outputs.
- `test/`: reporter/helper/component tests.
- `templates/`: HTML templates used by the report build.
- `public/`: static public assets.
- `dist/`: generated report assets. Usually do not edit by hand.
- `package.json`: npm metadata, scripts, dependencies, and package `files`
  whitelist.
- `.github/workflows/tests.yml`: pull request CI. Runs `npm run testCi` on Node
  22.19.0.
- `.github/workflows/npm-publish.yml`: release publish workflow. Runs install,
  `yarn buildCi`, then `npm publish`.

## Generated Files

Do not commit local build outputs unless the maintainer explicitly asks:

- `index.js`
- `helper.js`
- root `*.d.ts`
- `dist/*`
- `html-report/*`
- `coverage/*`
- `jest-html-reporters-attach`
- `tsconfig.tsbuildinfo`

These are ignored by `.gitignore`. Use generated files for verification, but
keep source changes in `index.ts`, `helper.ts`, `src/`, `test/`, `config/`,
`scripts/`, or docs.

## Common Commands

Use the local package manager style already present in the repository:

- `yarn tsc -p build`: compile the reporter/helper TypeScript entry points.
- `yarn testCi`: run TypeScript compile plus Jest with default reporter.
- `node scripts/test.js --reporters=default`: run Jest directly when `node` is
  available on PATH.
- `node scripts/verifyPackageFiles.js`: validate package metadata references.
- `yarn buildCi`: compile TypeScript and build report UI assets.

In Codex desktop environments where `node` is not on PATH, use the bundled Node
runtime path provided by `load_workspace_dependencies`, then call the JS entry:

- `<bundled-node> node_modules/typescript/bin/tsc -p build`
- `<bundled-node> node_modules/jest/bin/jest.js test/helper.spec.js --runInBand --reporters=default`

## Coding Rules

- Keep changes focused on the issue or requested behavior.
- Preserve unrelated worktree changes.
- Prefer existing patterns and dependencies; this project already uses React,
  Ant Design, Jest, Webpack, TypeScript, and `fs-extra`.
- For reporter/helper behavior, remember that `helper.ts` can run inside Jest
  workers while `index.ts` runs as the reporter in the Jest process. Avoid
  relying on in-memory shared state between them.
- For package metadata changes, keep `package.json` `files`, `main`, and
  `types` consistent and run `scripts/verifyPackageFiles.js`.
- For UI changes, update focused component tests when behavior changes.
- Do not add broad rewrites or styling churn while fixing backend/helper bugs.

## MR / PR Rules

This repository is hosted on GitHub, so "MR" usually means GitHub pull request.

1. Start from latest `origin/master` unless the user asks to continue an
   existing branch.
2. Use a focused branch name. Codex branches should use `codex/<short-topic>`.
3. Keep one logical issue per PR. Mention the issue number in the PR body when
   applicable, for example `Fixes #323`.
4. Before pushing a PR, run the smallest relevant test first, then a broader
   validation when feasible.
5. For normal code changes, run at least:
   - `yarn tsc -p build` or equivalent bundled-node `tsc -p build`
   - focused Jest tests for changed behavior
   - `yarn testCi` or equivalent full test run when the change is not trivial
6. For package metadata changes, also run:
   - `node scripts/verifyPackageFiles.js`
7. Do not commit ignored build outputs unless explicitly requested.
8. When creating a PR/MR, add the `AI` label. If using GitHub CLI, include
   `--label AI` during creation when possible, or add the label immediately
   after the PR is created.
9. Summarize the behavior change, tests run, and any residual risk in the PR
   description.
10. Prefer squash merge for this repo. Merge commits are not allowed by the
   repository settings.

## Issue Triage Notes

Good small-to-medium issues usually have a clear reproduction and a contained
code surface:

- Helper/reporter lifecycle issues usually live in `helper.ts`, `index.ts`, and
  `test/helper.spec.js`.
- Attachment rendering issues usually live in `helper.ts`,
  `src/components/ErrorButton.tsx`, and report data interfaces.
- Status/count issues usually live in `src/utils/index.tsx`,
  `src/components/MainTable.tsx`, `src/components/DetailTable.tsx`, and the
  dashboard components.
- Large report merge/append, Vitest, Playwright, and tree-view requests are
  larger product features. Clarify scope before implementing.
