import * as actions from './actionEnums'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const pointReady = () => createAction(actions.POINT_READY);