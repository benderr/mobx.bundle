import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects'
import {debounce} from 'redux-saga-debounce-effect'
import * as actions from '../enums/actions'
import * as modifierActions from '../actions/modifierActions'
import * as modifierSelectors from '../selectors/modifierSelectors'
import * as dataContext from '../dataProvider/productDataContext'
import {getPointId} from 'modules/core/selectors'
import {push} from 'connected-react-router'
import {notify} from 'common/uiElements/Notify'
import {uuid} from 'infrastructure/utils/uuidGenerator'
import GROUP_TYPE from '../enums/modifierGroupType'

export function* saveModifierGroup({group, point, meta}) {
	try {
		if (group.isNew) {
			group.modifiers = [];
			yield call(dataContext.addModifierGroup, point, group);
		} else {
			yield call(dataContext.saveModifierGroup, point, group);
		}

		yield put(modifierActions.saveGroup.success({group: group}));
		if (!meta) {
			yield put(notify.success(group.isNew ? 'Группа добавлена' : 'Группа обновлена'));
		} else {
			yield put(notify.success(meta.success));
		}
	}
	catch (error) {
		if (!meta) {
			yield put(notify.error('Не удалось сохранить группу', 'Ошибка'));
		} else {
			yield put(notify.error(meta.error));
		}
		yield put(modifierActions.saveGroup.failure({groupCode: group.code, error}));
	}
}

function* removeModifierGroup({groupCode, point}) {
	try {
		yield call(dataContext.removeModifierGroup, point, groupCode);
		yield put(modifierActions.removeGroup.success({groupCode}));
	}
	catch (error) {
		yield put(modifierActions.removeGroup.failure({groupCode, error}));
	}
}

function* searchGroups({formKey, query}) {
	try {
		const retailPointId = yield select(getPointId);
		const response = yield call(dataContext.getModifierGroups, retailPointId, 0, 50, query);
		yield put(modifierActions.searchGroups.success({formKey, groups: response.groupsList}));
	}
	catch (error) {
		yield put(modifierActions.searchGroups.failure({formKey, error}));
	}
}

function* openGroup({groupCode, inventCode, point}) {
	if (!groupCode) {
		groupCode = uuid();
		const group = {
			code: groupCode,
			inventCode: inventCode,
			isNew: true,
			name: '',
			modifierGroupType: GROUP_TYPE.OPTIONAL,
			modifiers: []
		};
		yield put(modifierActions.addNewGroup({group}));
	} else {
		yield put(modifierActions.groupReady({groupCode}));
	}
	yield put(push('/product/group', {groupCode, point}));
}

function* updateGroup({groupCode, point, meta}) {
	const groupImtbl = yield select(modifierSelectors.getGroupByCode(groupCode));
	if (!groupImtbl)
		return;
	const group = groupImtbl.toJS();
	yield call(saveModifierGroup, {group, point, meta})
}

export default function*() {
	yield [
		takeEvery(actions.SAVE_MODIFIER_GROUP.REQUEST, saveModifierGroup),
		debounce(actions.SEARCH_GROUPS.REQUEST, searchGroups),
		takeEvery(actions.REMOVE_MODIFIER_GROUP.REQUEST, removeModifierGroup),
		takeEvery(actions.OPEN_GROUP, openGroup),
		takeEvery(actions.UPDATE_GROUP, updateGroup)
	]
}