import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const openDetail = (contragent) => createAction(actions.OPEN_DETAIL_ITEM, {contragent});