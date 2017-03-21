import 'babel-polyfill';
import '../markup/stylus/style.styl';


import {render} from 'react-dom'
import React from 'react'
import RootContainer from 'containers/RootContainer'
import modules from 'modules/modules'
import configureRedux from 'redux/configureRedux.js'

const mountNode = document.getElementById('root');

const {store, routes}= configureRedux(modules, {});

render(<RootContainer store={store} routes={routes}></RootContainer>, mountNode);






