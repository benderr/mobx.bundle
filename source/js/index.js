import 'babel-polyfill';
import '../../markup/stylus/style_modulkassa.styl';
import {render} from 'react-dom'
import React from 'react'
import RootContainer from 'components/RootContainer'
import modules from 'modules/modules'
import configureRedux from 'redux/configureRedux.js'

const mountNode = document.getElementById('root');

const {store, routes, history}= configureRedux(modules, {});

render(<RootContainer store={store} routes={routes} history={history} />, mountNode);

