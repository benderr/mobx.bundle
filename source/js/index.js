import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import RootContainer from 'components/app/RootContainer';
import configureApp from 'configureApp';
import indexModules from './modules/indexModules';

require(__MARKUP_KASSA__);

const mountNode = document.getElementById('root');
const { stores, routes } = configureApp(indexModules);

render(<RootContainer stores={ stores } routes={ routes }/>, mountNode);

