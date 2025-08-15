# Vite React Component Package Starter

A **lightweight, ready-to-use starter kit** for building and publishing React components as npm packages.
This template comes pre-configured with **Vite** for lightning-fast builds, **TypeScript** for type safety, and a streamlined workflow for developing, testing, and releasing reusable UI components.

Whether you’re creating a single widget or an entire design system, this starter kit helps you focus on coding — not configuration.

---

## ✨ Features

* ⚡ **Vite-powered** — blazing-fast dev server & optimized production builds
* 📦 **Publish-ready** — fully configured to deploy to npm
* 🛠 **TypeScript support** — build with confidence and type safety
* 🎯 **ESM & CJS output** — works with modern and legacy projects
* 🧪 **Vitest testing setup** — unit & integration testing out of the box
* 🎨 **CSS/SCSS support** — style your components with ease
* 📖 **Storybook** — develop and preview components in isolation
* 🔍 **ESLint** — linting for clean, consistent code
* 🔗 **Husky** — pre-commit hooks for code quality
* 🚀 **GitHub Actions** — automate npm publishing & Storybook deployment

---

## 🚀 Get Started

### Option 1 — Use this template (recommended)

Click the **"Use this template"** button on the top right of the [GitHub repository](https://github.com/hamidyfine/vite-react-component-package-starter-kit) to quickly create your own repository from this starter kit.

### Option 2 — Clone manually

```bash
git clone https://github.com/hamidyfine/vite-react-component-package-starter-kit.git
cd your-repo
pnpm install
```

---

## 📜 Available Scripts

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `dev`             | Starts Storybook for local component development  |
| `test`            | Runs all tests using Vitest                       |
| `test:watch`      | Runs tests in watch mode                          |
| `build:storybook` | Builds Storybook as a static web app              |
| `build`           | Builds the component library with Vite            |
| `lint`            | Lints the codebase with ESLint                    |
| `release`         | Tags & publishes the package using **release-it** |

## 📂 Example Usage

After publishing your component library to npm:

```bash
npm install your-package-name
# or
pnpm add your-package-name
```

Then use it in your React project:

```tsx
import React from 'react';
import { MyComponent } from 'your-package-name';

export default function App() {
  return <MyComponent text="Hello from my component!" />;
}
```

---

## 📄 License

[MIT](./LICENSE) © hamidyfine
