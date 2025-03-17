# CitySearch

## Requirements

### NVM

This project uses **NVM** (Node Version Manager). In order to run the project locally, the following steps are needed:

First, install NVM. Installation instructions can be found in the [project's website](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

Once installed, you can run the following command at the root of the project

```bash
nvm use
```

This sets the node version to the one used by the project, as specified in the file `.nvmrc` at the root of the project if it is installed locally. Otherwise, it prompts to install it, which can be done with the command

```bash
nvm install <VERSION>
```

The required version can be found in said file.

### GeoDB Cities

Access to the GeoDB Cities database is required for the software to work. It can be obtained at [RapidAPI](https://rapidapi.com/hub). The environment variables need to be configured in the file
`.env.local` with the keys specified in the file `.env.example`. As can be seen, base URL, host and key are needed.

### Dependencies

The dependencies can be installed via **NPM**, using the following command.

```bash
npm install
```

This is a **Next.js** app, using **SASS Modules** for the styling. It uses **Typescript** and **ESLint** for the enforcement of the code style.

**Storybook** is used for the development and testing of components in isolation.

## Getting Started

### Running the development server

Once the requirements are fulfilled, the development server can be started with

```bash
npm run dev
```

## How it works

In order to make the experience usable, we have to make the user select the country before being able to type the city with the autocompletion feature. The autocompletion feature only works when there are three or more letters as the prefix to search the city.

