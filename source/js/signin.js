import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import RootContainer from 'components/app/RootContainer';
import configureApp from 'configureApp';
import signinModules from './modules/signinModules';

require(__MARKUP_LOGIN__);

const mountNode = document.getElementById('root');
const { stores, routes, history } = configureApp(signinModules);

render(<RootContainer stores={ stores } routes={ routes } history={ history } />, mountNode);
