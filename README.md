# Mobx.bundle
Boilerplate для проектов с использованием React+Mobx+Webpack 2

Требования к проекту:

1. Загрузка скриптов по требованию
2. Работа с системой Логгирования
3. Использование Jest для тестирования
4. Использование DI, IoC
5. Реализовать механизм подключения модульного создания actions/reducers и их автоматического подключения к store
# React and Redux, Webpack 2 boilerplate


## Setup

Tested with node 6.x and 7.x

```
$ npm install
```

## Running in dev mode

```
$ npm start
```

## Build (production)

Build will be placed in the `build` folder.

```
$ npm run build
```

Сайт поделен на два приложения, index и signin, index - основное приложение, работа внутри личного кабиента, signin - отвечает за авторизацию, регистрацию и раздел "забыли пароль"
Чтобы сайт корректно работал с двумя приложениями необходимо корректно настроить nginx, пример конфигурации можно посмотреть в файле nginx.conf

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


