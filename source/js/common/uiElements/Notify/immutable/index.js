import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import * as reducer from './immutable-reducer';
import _NotifyService from '../NotifyService';
import toJS from './immutableParser';

const NotifyService = toJS(_NotifyService);

export {actions, actionTypes, reducer, NotifyService}