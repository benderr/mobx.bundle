# ModulBank.Kassa
Boilerplate для проектов с использованием React+Redux+Webpack 2

Требования к проекту:

1. Загрузка скриптов по требованию
2. Работа с системой Логгирования
3. Использование Jest для тестирования
4. Использование DI, IoC
5. Реализовать механизм подключения модульного создания actions/reducers и их автоматического подключения к store
# React and Redux, Webpack 2 boilerplate

## Features

- [x] React
- [x] React router
- [x] Redux
- [x] Redux Thunk
- [x] Redux Dev Tools
- [x] Immutable reducer data
- [x] Webpack 2 (development and production config)
- [x] Hot Module Replacement
- [x] Babel - static props, decorators
- [x] SASS with autoprefixing
- [x] Webpack dashboard
- [x] Linting
- [x] Included `es6-promise` and `isomorphic-fetch`
- [x] Preview production build
- [x] File imports relative to the app root
- [x] Git hooks - lint before push

## TODO

- [ ] Tree shaking build
- [ ] Switch to [redux-saga](https://github.com/redux-saga/redux-saga)
- [ ] Universal rendering
- [ ] Server async data
- [ ] Internationalization

Other nice to have features

- [ ] Generating icon font from SVGs
- [ ] Modernizr
- [ ] Google analytics
- [ ] Error reporting (not sure if this should be the part of the boilerplate)

## Setup

Tested with node 6.x and 7.x

```
$ npm install
```

## Running in dev mode

```
$ npm start
```

Visit `http://localhost:3000/` from your browser of choice.
Server is visible from the local network as well.

![Running in the iTerm2](http://i.imgur.com/IxamMBh.png)

It is using [webpack dashboard](https://github.com/FormidableLabs/webpack-dashboard), so please note the following:

**OS X Terminal.app users:** Make sure that **View → Allow Mouse Reporting** is enabled, otherwise scrolling through logs and modules won't work. If your version of Terminal.app doesn't have this feature, you may want to check out an alternative such as [iTerm2](https://www.iterm2.com/).

## Build (production)

Build will be placed in the `build` folder.

```
$ npm run build
```

If your app is not running on the server root you should change `publicPath` at two places.

In `webpack.config.js` (ATM line 147):

```
output: {
  path: buildPath,
  publicPath: '/your-app/',
  filename: 'app-[hash].js',
},
```

and in `source/js/routes` (ATM line 9):

```
const publicPath = '/your-app/';
```

Don't forget the trailing slash (`/`). In development visit `http://localhost:3000/your-app/`.

## Running in preview production mode

This command will start webpack dev server, but with `NODE_ENV` set to `production`.
Everything will be minified and served.
Hot reload will not work, so you need to refresh the page manually after changing the code.

```
npm run preview
```

## Linting

For linting I'm using [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb),
but some options are overridden to my personal preferences.

```
$ npm run lint
```

## Git hooks

Linting pre-push hook is not enabled by default.
It will prevent the push if lint task fails,
but you need to add it manually by running:

```
npm run hook-add
```

To remove it, run this task:

```
npm run hook-remove
```



-----

## Changelog

#### 0.1.1

* Fixed running it on Windows machines

#### 0.1.0

* Updated `webpack` to a stable version

#### 0.0.3

* Added pre-push git hook
* Added `preview` task

#### 0.0.2

* Added Redux Dev Tools.
* Renamed `client` to `source`
* Made sure `logger` and `DevTools` are loaded only in development

#### 0.0.1

Initial release
