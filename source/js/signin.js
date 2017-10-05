require(__MARKUP_KASSA__);

import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import RootContainer from 'components/RootContainer';
import configureApp from 'configureApp';
import signinModules from './modules/signinModules';

const mountNode = document.getElementById('root');
const { stores, routes, history } = configureApp(signinModules);

render(<RootContainer stores={ stores } routes={ routes } history={ history } />, mountNode);
