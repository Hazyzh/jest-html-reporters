---
name: project-maintenance
description: Use when maintaining jest-html-reporters: triaging GitHub issues, making focused fixes, updating tests, preparing PRs, or checking package/release metadata.
---

# Project Maintenance Skill

Load `.agents/README.md` first for repository structure, generated-file rules,
commands, and MR/PR expectations.

## Workflow

1. Inspect the current branch and worktree:
   - `git status --short --branch`
   - Preserve unrelated changes.
2. If starting a new fix, base work on latest `origin/master` unless the user
   says otherwise.
3. Identify the smallest relevant code surface:
   - Reporter lifecycle: `index.ts`, `helper.ts`, `test/helper.spec.js`.
   - Report UI: `src/components/`, `src/utils/`, `src/interfaces/`, component
     tests under `test/components/`.
   - Build/package metadata: `package.json`, `build/tsconfig.json`,
     `scripts/verifyPackageFiles.js`, `.github/workflows/`.
4. Implement the focused change using existing patterns.
5. Add or update tests near the existing coverage for that behavior.
6. Run focused validation first, then broader validation when feasible.
7. Before PR creation, prepare a concise summary with:
   - What changed.
   - Which issue it addresses.
   - Tests run.
   - Any behavior or compatibility risk.

## Validation Checklist

- TypeScript entry compile: `yarn tsc -p build` or bundled-node equivalent.
- Focused Jest test for the changed behavior.
- Full suite for non-trivial changes: `yarn testCi` or equivalent.
- Package metadata check when `package.json` `main`, `types`, or `files`
  changes: `node scripts/verifyPackageFiles.js`.

## PR Checklist

- Branch name uses `codex/<short-topic>` for Codex work.
- PR targets `master`.
- PR is focused on one issue or logical change.
- PR body references related issue, for example `Fixes #323`, when appropriate.
- Add the `AI` label when creating a PR/MR. If using GitHub CLI, pass
  `--label AI` when possible, or add the label immediately after creation.
- No ignored/generated files are included unless explicitly requested.
- Use squash merge when merging.
