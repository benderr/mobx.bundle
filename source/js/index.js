require(__MARKUP_KASSA__);

import 'babel-polyfill';
import {render} from 'react-dom'
import React from 'react'
import RootContainer from 'components/RootContainer'
import configureApp from 'configure.js'
import indexModules from './modules/indexModules'

const mountNode = document.getElementById('root');
const {stores, routes, history} = configureApp(indexModules);

render(<RootContainer stores={stores} routes={routes} history={history} />, mountNode);

