require(__MARKUP_KASSA__);

import 'babel-polyfill';
import {render} from 'react-dom'
import React from 'react'
import RootContainer from 'components/RootContainer'
import modules from 'modules/modules'
import configureApp from 'mobx/configure.js'
const mountNode = document.getElementById('root');

const {store, routes, history}= configureApp(modules);

render(<RootContainer routes={routes} history={history} />, mountNode);

