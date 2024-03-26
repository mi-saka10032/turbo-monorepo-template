# Turbo Monorepo Template

这是一份面向 monorepo 新手的 ts 全栈 template repo（简称 TMT），包含的功能有且不限于：

- 插拔式可扩展 tsconfig 预设规则
- 插拔式可扩展 lint 预设规则（commitlint、eslint、prettier、stylelint）
- 插拔式可扩展 vite.config 预设配置
- hooks 和 request 公共 packages 库简单实现
- micro-app 微前端公共 packages 库简单实现
- 三份微前端模板应用（vue、react）的嵌套实现
- 两份后端模板应用（midway、nest）的交互实现

以上 configs 或 packages 对新建的前后端 ts 应用没有强依赖关系，新的项目可以自行决定要植入的 configs 或 packages，也可以在内部完全由自己实现并管理自己的 configs 或 packages。

✨TODO

- 完善 configs 预设
- 补充可用于生产环境的`nginx.conf`、`Dockerfile`等文件

## 开发与使用

### `💻安装`

TMT 只允许使用 pnpm 安装依赖

```shell
pnpm install
```

### `🔥推荐IDE`

- [VS Code](https://code.visualstudio.com/)

**注意：如果使用 VsCode 打开项目后发现 vue 文件出现 stylelint 相关的报错提示，属于当前版本 stylelint 插件对 vue 文件的识别 bug，请在当前工作区禁用 stylelint！**

### `🚀运行`

并行运行前端应用

```shell
pnpm dev:client
```

并行运行后端应用

```shell
pnpm dev:server
```

并行运行全部前后端应用

```shell
pnpm dev
```

### `📦️构建`

基于环境执行动态打包

```shell
pnpm build:dev
```

```shell
pnpm build:test
```

```shell
pnpm build:prod
```

**其他功能请自行探索 🔥**

## 新增与修改

```text
├── apps
│   ├── main
│   ├── sub-react
│   └── sub-vue
├── backend
│   ├── midway
│   └── nest
├── configs
│   ├── commit-config
│   ├── eslint-config
│   ├── prettier-config
│   ├── stylelint-config
│   ├── typescript-config
│   └── vite-config
└── packages
    ├── hooks
    ├── micro-app
    └── request
```

基于 TMT 新增或修改项目需要对以下内容有一定程度的了解：

- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [pnpm](https://pnpm.io/)
- [turborepo](https://turbo.build/repo)

开发过程中遇到的绝大部分错误基本都来自 configs 相关的错误，请根据错误提示进行排查修复。

接下来，我会提供一个简单的新建项目（项目名：demo，构建工具 vite）示例：

### 确认并初始化项目

项目的文件夹目录必须在`pnpm-workspace.yaml`声明，不在此文件中被声明的路径无法被 pnpm 管理

```yaml
packages:
  - "apps/*"
  - "backend/*"
  - "packages/*"
  - "configs/*"
```

你可以自行创建`apps/demo`路径后在里面手动初始化`package.json`并从零开始搭建项目，也可以使用社区脚手架命令一键搭建模板应用

```shell
// apps
pnpm create vite
```

最后，确认`package.json`的 scripts 至少包含一条本地开发命令和一条构建命令。请务必确认新项目的命令名称在`turbo.json`中存在声明

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build:prod": "vue-tsc && vite build"
  }
}
```

### 植入预设规则

注意：

1. TMT 不限制你创建纯粹的 js 项目，但以下规则全部基于 ts 规则提供，建议最好使用 ts 开发以获取最佳的开发体验。
2. eslint-config 和 prettier-config 通常搭配使用，stylelint-config 和 vite-config 没有限制，请按需植入。
3. 使用以下规则时默认`package.json`的`"type": "module"`为启用状态，即默认新项目使用 ESM 风格。CJS 风格项目容易出现一些需要额外关注的错误。
4. 由于 eslint 和 ts 的 configs 使用频率较高，这两个包已提升到根目录依赖，新项目使用时这两个依赖可无需安装

#### 安装规则

1. eslint-config
2. prettier-config
3. stylelint-config
4. typescript-config
5. vite-config

```json
{
  "devDependencies": {
    "@configs/eslint-config": "workspace:*",
    "@configs/prettier-config": "workspace:*",
    "@configs/stylelint-config": "workspace:*",
    "@configs/typescript-config": "workspace:*", // 可以不安装
    "@configs/vite-config": "workspace:*" // 可以不安装
  }
}
```

声明依赖后，执行安装命令

```shell
pnpm install
```

#### 使用规则

创建`tsconfig.json`文件

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  // ts-config提供以下四种规则，根据需要选择，也可以自行扩展规则
  // "extends": "@configs/typescript-config/base.json",
  // "extends": "@configs/typescript-config/midway.json",
  // "extends": "@configs/typescript-config/node.json",
  "extends": "@configs/typescript-config/app.json",
  "compilerOptions": {
    "baseUrl": ".",
    "declaration": false,
    "types": ["vite/client"],
    "paths": {
      "@/*": ["src/*"],
      "#/*": ["types/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "vite.config.ts"
  ],
  "exclude": ["node_modules", "dist", "**/*.js"]
}
```

创建`.eslintrc.cjs`文件

```js
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  // eslint-config提供以下四种规则，根据需要选择，也可以自行扩展规则
  // extends: ['@configs/eslint-config'],
  // extends: ['@configs/eslint-config/react'],
  // extends: ['@configs/eslint-config/nest'],
  extends: ["@configs/eslint-config/strict"],
};
```

创建`.prettierrc.cjs`文件

```js
module.exports = require("@configs/prettier-config");
```

创建`.stylelintrc.cjs`文件

```js
module.exports = {
  root: true,
  extends: ["@configs/stylelint-config"],
};
```

创建`vite.config.ts`文件，vite 规则支持覆盖与合并。

```ts
import { defineApplicationConfig } from "@configs/vite-config";

// https://vitejs.dev/config/
export default defineApplicationConfig({
  overrides: {
    server: {
      port: 3006,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue"],
          },
        },
      },
    },
  },
});
```

如果 VsCode 的代码提示没有生效，请重启后再次确认

### 使用公共库方法

公共库方法的安装和使用基本和 configs 相同

```json
{
  "devDependencies": {
    "@packages/hooks": "workspace:*"
  }
}
```

```shell
pnpm install
```

在项目中使用

```vue
<script setup lang="ts">
import { useVueCount } from '@packages/hooks';

const { add, count } = useVueCount();
</script>

<template>
  <div>{{ count }}</div>
  <button @click="add">Add Count</button>
</template>
```