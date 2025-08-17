# Dynamic Icon Component for Tabler-Icons

A tiny React component that renders **Tabler** icons in three different ways, by **CSS class** (webfont), by **component**, or by **name** (lazy-loaded). It picks the first available option based on a clear priority order.

```tsx
import { Icon } from 'tabler-dynamic-icon';
```

---

## Installation

Install the required Tabler packages:

```bash
# with pnpm
pnpm add tabler-dynamic-icon @tabler/icons-react @tabler/icons-webfont

# or with npm
npm i tabler-dynamic-icon @tabler/icons-react @tabler/icons-webfont

# or with yarn
yarn add tabler-dynamic-icon @tabler/icons-react @tabler/icons-webfont
```

> If you **don’t** want to use webfonts at all, you can **skip** `@tabler/icons-webfont`.

## Style Import (Required)

This package ships with a base stylesheet.
You **must** import it once in your app:

```ts
import 'tabler-dynamic-icon/style';
```

## Webfont (optional)

If you choose to use the webfont (for the `cls` prop), import one of the CSS files in your app:

```ts
// minimal bundle
import '@tabler/icons-webfont/dist/tabler-icons.min.css';

// OR choose a specific weight+style bundle:
import '@tabler/icons-webfont/dist/tabler-icons-[weight]-[style].min.css';

// Example:
import '@tabler/icons-webfont/dist/tabler-icons-300-outline.css';
```

---

## Usage

The component supports **three** input styles. Provide **at least one** of the following props:

* `cls`  → renders a **webfont** icon by CSS class (e.g. `"alarm"`)
* `icon` → renders a **React component** (e.g. `IconAlarm`)
* `name` → renders a **lazy-loaded** icon by its exported name from `@tabler/icons-react` (e.g. `"IconAlarm"`)

### Priority

If you pass multiple, the component uses the **first** match in this order:

1. `cls`
2. `icon`
3. `name`

---

## Examples

### 1) Webfont via `cls` (requires webfont CSS)

```tsx
<Icon cls="alarm" size={24} />
// renders: <i class="ti ti-alarm ..." />
```

### 2) Direct component via `icon`

```tsx
import { IconAlarm } from '@tabler/icons-react';

<Icon icon={IconAlarm} size={24} stroke={2} />
```

### 3) Lazy by exported `name`

```tsx
<Icon name="IconAlarm" size={24} stroke={1.5} />
// Dynamically imports @tabler/icons-react and renders `module["IconAlarm"]`
```

---

## Props

| Prop                   | Type                                 | Default | Description                                                                                                                       | Example                                     |
| ---------------------- | ------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `animation`            | `'spin'`                             | —       | Adds an animation to the icon.                                   | `<Icon cls="loader" animation="spin" />`    |
| `cls`                  | `IconClasses`                             | —       | **Webfont** class suffix. Prepends `ti ti-` to the value and renders it using Tabler webfont. Requires importing the webfont CSS. | `cls="alarm"` → `<i class="ti ti-alarm" />` |
| `icon`                 | `TablerIcon`                         | —       | A Tabler React icon component imported directly from `@tabler/icons-react`.                                                       | `icon={IconAlarm}`                          |
| `name`                 | `keyof typeof IconsName` | —       | The export name of an icon from `@tabler/icons-react`. The icon is lazy-loaded via `React.lazy`.                                  | `name="IconAlarm"`                          |
| `size`                 | `number`                             | `18`    | Icon size in pixels. Applies to all rendering modes.                                                                              | `size={24}`                                 |
| `stroke`               | `number`                             | `1.5`   | Stroke width for SVG icons (applies to `icon` and `name` modes).                                                                  | `stroke={2}`                                |
| *(other Tabler props)* | Various                              | —       | Any other props supported by `@tabler/icons-react` (e.g. `color`, `className`).                                                   | `color="red"`                               |

### Notes

* **At least one** of `cls`, `icon`, or `name` must be provided; otherwise the component returns `null`.
* `name` uses `React.lazy` under the hood and is wrapped in an internal `Suspense` with a small blank fallback box that matches the requested size.

---

## Styling Hooks

The component ships with base classes:

* Wrapper (webfont mode): `icon__box`
* Icon element: `icon`

---

## TypeScript

Both `cls` and `name` props are **fully type-safe**. This ensures you’ll get autocompletion and type-checking directly in your editor.

```ts
<Icon name="IconAlarm" />
<Icon cls="alarm" />
```

---

## Using Types and Classes

This package exports **typed helpers** so you can work with icons more easily:

### `IconsClassName` (all class names)

An array of all available **webfont class names**:

```ts
import { IconsClassName } from 'tabler-dynamic-icon/classes';

for (const cls of IconsClassName) {
  console.log(cls); // "alarm", "123", "calendar", ...
}
```

### `IconsCls` (the `cls` prop type)

The type-safe string literal union of all valid `cls` values:

```ts
import type { IconsCls } from 'tabler-dynamic-icon/classes';

const valid: IconsCls = 'alarm';   // ✅
const invalid: IconsCls = 'wrong'; // ❌ TS error
```

### `IconsName` (enum of component names)

Enum of all available React component icon names from `@tabler/icons-react`:

```ts
import { IconsName } from 'tabler-dynamic-icon/enums';

const name: IconsName = IconsName.IconAlarm;

<Icon name={IconsName.IconBell} size={20} />;
```

---

**Key benefits of typing `cls` and `name`:**

* Full **autocomplete** in your IDE
* **Compile-time errors** if you use a non-existent icon
* Easier refactoring and consistency across the codebase

---

## FAQ

**Do I need to add a `<Suspense>` around `<Icon />`?**
No—`Icon` already wraps the lazy import with an internal `Suspense` and a minimal fallback.

**Can I avoid shipping the webfont?**
Yes. Skip `@tabler/icons-webfont` and don’t use the `cls` prop. Use `icon` or `name` instead.

**Performance tips?**

* Prefer `name` for on-demand, code-split loading.
* Prefer `icon` if you already import specific icons elsewhere and want tree-shaking.
* Use `cls` when you want simple, CSS-only rendering (ensure the webfont CSS is loaded).

---

## Complete Example

```tsx
import '@tabler/icons-webfont/dist/tabler-icons.min.css';
import { Icon } from 'tabler-dynamic-icon';
import { IconHeart } from '@tabler/icons-react';

export default function Demo() {
  return (
    <>
      {/* webfont */}
      <Icon cls="alarm" size={20} />

      {/* direct component */}
      <Icon icon={IconHeart} size={24} stroke={2} />

      {/* lazy name */}
      <Icon name="IconBell" size={28} />

      {/* with animation */}
      <Icon cls="loader" animation="spin" size={18} />
    </>
  );
}
```
