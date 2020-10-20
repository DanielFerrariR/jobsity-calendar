<h1 align="center">
  Jobsity Calendar
</h1>

<a align="center" href="./CHANGELOG.md">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" />
</a>

<a align="center" href="https://travis-ci.com/github/DanielFerrariR/jobsity-calendar">
  <img src="https://travis-ci.com/DanielFerrariR/jobsity-calendar.svg?branch=master" />
</a>

[![codecov](https://codecov.io/gh/DanielFerrariR/jobsity-calendar/branch/master/graph/badge.svg?token=4VW1RJZ44J)](undefined)

## TOC

- [Workspace](#workspace)
- [Configuration](#configuration)
- [Tests](#tests)
- [CI Configuration](#ci-configuration)
- [Deploy](#deploy)
- [Links](#links)

## Workspace

- Visual Studio Code 1.45.1

  - VSCode extensions:

    - Prettier - Code formatter 4.7.0
    - Eslint 2.1.5
    - VSCode MDX 0.1.4

  - VSCode settings:

  ```sh
  {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": false
    },
    "javascript.validate.enable": false,
    "eslint.validate": ["markdown", "md", "mdx"],
    "prettier.requireConfig": true,
  }
  ```

## Configuration

1. **Install these packages (prefer the listed versions):**

- yarn 1.21.1
- npm 6.13.4
- node 12.16.1

2. **Create a .env file with the required variables:**

```sh
WEATHER_API_KEY=
```

3. **Install all dependencies with yarn (not npm!!)**

```sh
yarn
```

4. **Start the webpack-dev-server**

```sh
yarn dev
```

5. **If Cypress (yarn test:e2e) is still not installed after yarn. Install cypress with:**

```sh
npx cypress install
```

6. **If Cypress download is corrupted, is because Cypress binary installation is currently bugged and doesn't allow two versions of Cypress on yarn.lock. The @testing-library/cypress is getting the last cypress version available and putting it on yarn.lock, then, if you update Cypress, it adds another cypress version to yarn.lock and the binary installation gets confused. To temporary fix the issue, delete yarn.lock and run yarn again. Check if the issue got fixed on the link below, if it got fixed, please delete this step**

<https://github.com/cypress-io/cypress/issues/4595>

7. **Commands**

```bash
# Installs all dependendies
$ yarn

# Runs for web production (needs yarn build first)
$ yarn start

# Runs for web development
$ yarn dev

# Builds for web (compiled to dist/web)
$ yarn build

# Runs unit tests with Jest
$ yarn test (picks automatically test:watch on local machine and test:coverage on CI)
$ yarn test:coverage (creates coverage folder)
$ yarn test:watch (with --watch flag)
$ yarn test:debug (to use chrome to debug jest tests)

# Runs E2E/Integration tests with Cypress
$ yarn test:e2e (picks automatically test:e2e:dev on local machine and test:e2e:run on CI)
$ yarn test:e2e:dev (with interface)
$ yarn test:e2e:run (without interface)

# Checks Eslint errors
$ yarn lint

# Formats all files with prettier
$ yarn format

# Checks if all files are formatted with prettier
$ yarn check-format

# Checks typescript errors
$ yarn check-types

# CI validation command
$ yarn setup

# Storybook
$ yarn storybook

# Analyzes the compiled files with source-map-explorer
$ yarn analyze

# Commits with karma interface
$ yarn commit
```

## Tests

- Unit tests are in spec/jest/unit.
- Integration tests are in spec/cypress/integration.

## CI configuration

- Set the environment variables in the CI environment variable section.
- The only command needed to be put on CI is 'yarn setup' which tests formatting with prettier, eslint errors, typescript errors and all tests.
- You need chrome installed on CI for cypress (prefer cypress/browsers 12.16.1 docker image which comes with chrome).
- In case 'yarn setup' is too heavy for your CI. You can separate each needed script like:

```bash
# Installs all dependencies
$ yarn

# Removes all folders that will be used for the merge coverage
$ rimraf .nyc_output && rimraf reports

# Installs cypress (maybe needed if your CI doesn't have cypress installed)
$ npx cypress install

# Checks typescript errors
$ yarn check-types

# Checks prettier formatting error
$ yarn check-format

# Checks Eslint errors
$ yarn lint

# Checks jest unit tests errors (The flag '--maxWorkers 1' can help with heavy memory usage on CI)
$ yarn test:coverage

# Checks cypress e2e/integration tests errors
$ yarn test:e2e:run

# Combines the coverage folder of cypress and jest into a single coverage folder
$ yarn report:combined
```

## Deploy

1. First, be sure you did everything from the configuration section (steps 1 to 4 are the most important ones).
2. 'yarn build' command will compile all files and put them into dist folder.
3. Install Apache. (I'm using XAMPP for this example. Link: <https://www.apachefriends.org/download.html>)
4. Clean up htdocs folder of xampp/htdocs.
5. Put all files from dist folder into xampp/htdocs folder.
6. Open XAMPP and, on the line of module apache, click on the 'Start' button.
7. Access 'localhost' from your browser and see that the page loads correctly. It will still not work if you try to access a route manually (like 'localhost/login'). See below how to fix it.

- For react router works correctly, you need to create a file '.htaccess' in the root of htdocs directory. Put this info there:

```bash
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## Links

[Codcov](https://codecov.io/gh/DanielFerrariR/jobsity-calendar/branch/master)
