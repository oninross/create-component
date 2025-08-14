# Create Component

A **command-line tool** to scaffold React components with optional **SCSS Modules** or **Styled Components**, **Jest tests**, and **Storybook stories**. Includes **interactive folder traversal** to choose exactly where the component should be created.

---

## Features

- Generate a new React functional component.
- Choose **SCSS Module** or **Styled Components** for styling.
- Optionally generate:
  - Jest **unit test**
  - Storybook **story**
- Interactive folder selection:
  - Traverse **down into subfolders**
  - Move **up to parent folders**
  - Select the current folder to create the component
- Generates:
  - `ComponentName.tsx`
  - `ComponentName.types.ts`
  - `ComponentName.module.scss` or `ComponentName.styles.ts`
  - `ComponentName.test.tsx` (optional)
  - `ComponentName.stories.tsx` (optional)
  - `index.ts` for easy imports

---

## Installation

### Globally (recommended)

```bash
npm i @oninross/create-component -g
```

### npx

```bash
npx @oninross/create-component
```

---

Template Files

The CLI uses templates inside its templates/ folder:

component.tsx – React component

types.ts – Props interface

module.scss – SCSS Module template

styles.ts – Styled Components template

test.tsx – Jest test template

story.tsx – Storybook story template

These are automatically copied and renamed according to the component name.

Notes

The CLI works from any project without requiring templates in the project itself.

Templates are packaged with the CLI.

Folder traversal supports moving up and down the directory tree.

Make sure your component name uses PascalCase.
