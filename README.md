<img src="frontend/public/icons/estherkool.svg" width="300" alt="Esther Kool Signature" />

# Estherkool.com

This is the repo to the personal website of Esther Kool.

It is an application built with:

- [React](https://reactjs.org/),
- [Next.js](https://nextjs.org/) (SSR),
- [Apollo Client](https://www.apollographql.com/apollo-client) (Data management with GraphQL for BE Microservices),
- [KeystoneJS](https://keystonejs.com/) (Headless JS-based CMS)
- [Storybook](https://storybook.js.org/) (visual development and testing)
- [TypeScript](https://www.typescriptlang.org/) (type checking)
- [(Dart) SCSS](https://sass-lang.com/) and [CSS Modules](https://github.com/css-modules/css-modules) (modular styling)

---

## Installation

Prerequisites to running the site service locally:

- [node.js](https://nodejs.org/en/) (Latest LTS version or higher)
- [yarn](https://yarnpkg.com/) is used as build tool.

When using Node.js version >= 16.10, Yarn is included and available by running:

```bash
corepack enable
```

When these core-dependencies are installed, you can install the rest of the dependencies for this project by going to folder `/frontend` and running:

```bash
yarn
```

Repeat the same command in folder `/backend`:

```bash
yarn
```

### process.ENV

This project depends on environment variables, saved in `.env` files in the root of the project. `.env.development` contains development variables, `.env.production` contains the production ones. NextJS picks up the correct file automatically, based on the publicRuntimeConfig (server + client) and serverRuntimeConfig (server side only) keys in the NextJS config file in the frontend root of the project. In the backend Keystone files, please refer the dotenv package to the correct ENV setting.

```bash
# NextJS or Keystone picks variables in .env.development:

yarn dev

# NextJS or Keystone picks up variables from .env.production:

yarn start
```

If you are in need of secret variables, store them in a new file called `.env.local` in the root.

⚠️ **WARNING**: `.env.local` should _**never**_ be committed into the repository, because it can contain sensitive data (tokens, account details, etc).

### Clean dependency install

If you run into some dependency issues, sometimes a clean install will help. To do so, simply delete the `node_modules` folder and the either `package-lock.json` (for npm) or `yarn.lock` (for yarn) and run the installation script again.

Committing adjusted lock files is advised to keep the project as similar as possible between developers, which is why we advise using `yarn` as well, so everything stays in sync.

---

## Developing locally

First, run the backend from the root:

```bash
cd /backend
yarn dev
```

Open [http://localhost:3010](http://localhost:3000) with your browser to see the result.

Then, run the frontend from the root:

```bash
cd /frontend
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Storybook

To run a local Storybook instance, from the root run:

```bash
cd /frontend
yarn storybook
```

Storybook will open up it's own local server on [http://localhost:6006](http://localhost:6006).

---

## Building

To build a production version of the site service, run:

```bash
yarn build
```

### ! This needs to be done in both the front- and backend folders. !

To build an export of Storybook, from the root run:

```bash
cd /frontend
yarn build-storybook
```

---

## Frontend Project Structure

| Folder           | Contents                     | TypeScript Path            | Notes                                                                                                                                                             |
| ---------------- | ---------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/frontend/.next`         | NextJS output                |                            | Generated folder by NextJS. Contains site output. Can be deleted in case of caching issues.                                                                       |
| `/frontend/.storybook`    | Storybook config             |                            | Contains Storybook config. Not generated, **do not delete!**                                                                                                      |
| `/frontend/components`    | Project Components           | `@enk/components`          | Contains all React components including SCSS modules.                                                                                                             |
| `/frontend/lib`           | Project utils and config     | `@enk/lib`, `@enk/icons/*` , `@enk/utils`, `@enk/translations`| Contains all JS util files, component data mocks, and service connection (e.g. Apollo and) configs. (SVG's are located in `public/icons`)              |
| `/frontend/node_modules`  | Project dependencies         |                            | Generated by node. Can be deleted in case of dependency issues, but should always be re-installed.                                                                |
| `/frontend/pages`         | Pages                        |                            | Unique folder name utilized by NextJS. Contains the platform's pages.                                                                                             |
| `/frontend/public`        | Publically accessible files. |                            | Unique folder name utilized by NextJS. Contains assets that can be referenced from the root of the site (e.g. `public/image.jpg` would become `estherkool.com/image.jpg`) |
| `/frontend/stories`       | Storybook stories            |                            | Contains all stories shown in Storybook.                                                                                                                          |
| `/frontend/styles`        | SCSS, global styles          | `@enk/style/*`, `@enk/global-style`        | Contains all SCSS config (variables/mixins etc) and global styling not defined in components.                                                                     |
| `/frontend`           | Various config files         |                            | Contains config for GitLab, Prettier, NextJS, i18n, TypeScript etc. Basically: only touch when you know what you're doing.                          |