import {call, put, take, fork, takeEvery, cancel, cancelled, select} from 'redux-saga/effects'
import * as actions from '../actions/actionTypes'
import * as actionEnum from '../enums/actions'
import * as dataContext from '../dataProvider/dataContext'
import * as productDataContext from 'modules/products/dataProvider/productDataContext'
import logger from 'infrastructure/utils/logger'
import {getPointId} from 'modules/core/selectors'
import * as tabSelector from '../selectors/tabSelector'
import {subscribeToUrl} from 'modules/core/sagas'
import {uuid} from 'infrastructure/utils/uuidGenerator'
import {notify} from 'common/uiElements/Notify'
import {initialize} from 'redux-form/immutable'
import {debounce} from 'redux-saga-debounce-effect'
import GridCreator from '../helpers/GridCreator'
import GridValidator from '../helpers/GridValidator'
import {HOT_KEY_TYPE, DEFAULT_COLOR} from '../enums/enums'

//region tabs

function* getTabs({start, count}) {
	try {
		const retailPointId = yield select(getPointId);
		const {pos, totalCount, tabList} = yield call(dataContext.getTabList, retailPointId, start, count);
		yield put(actions.getHotKeysList.success({pos, totalCount, tabList}));
	}
	catch (error) {
		logger.log(error);
		yield put(actions.getHotKeysList.failure({error}));
	}
}

function* saveTab({tab}) {
	yield call(saveTabAndHotKeys, tab.code);
}

function* saveTabAndHotKeys(tabCode) {
	try {
		const retailPointId = yield select(getPointId);
		const tabSection = yield select(tabSelector.getSection);
		const tabData = tabSection.getIn(['tabList', tabCode]).toJS();
		tabData.hotKeys = tabSection.getIn(['keysList'])
			.filter(s => s.get('tabCode') === tabCode)
			.toList().toJS();
		yield call(dataContext.saveTab, retailPointId, tabData);
		yield put(actions.saveTab.success({tab: tabData}));
	}
	catch (error) {
		logger.log(error);
		yield put(notify.error('Не удалось сохранить вкладку'));
		yield put(actions.saveTab.failure({tabCode, error}));
	}
}

function* removeTab({code}) {
	try {
		const tabs = yield select(tabSelector.getTabs);
		const tab = tabs ? tabs.first() : null;
		if (tab) {
			yield put(actions.selectTab({code: tab.get('code')}));
		} else {
			yield newTab();
		}

		const retailPointId = yield select(getPointId);
		yield call(dataContext.removeTab, retailPointId, code);
		yield put(actions.removeTab.success({code}));
	}
	catch (error) {
		logger.log(error);
		yield put(notify.error('Не удалось удалить вкладку'));
		yield put(actions.removeTab.failure({error}));
	}
}

function* setTabs({pos, totalCount, tabList}) {
	const tabs = tabList.entities.tabs;
	const tabArray = tabList.result || [];
	const keys = tabList.entities.hotKeys || {};

	if (tabArray.length == 0) {
		yield newTab();
	} else {
		//устанавливаем список табов и клавиш
		yield put(actions.setTabs({tabs, keys, totalCount, pos}));
		//устанавливаем первую табу
		const tab = Object.keys(tabs).reduce((tab, key) => {
			if (tab == null)
				return tabs[key];
			if (tabs[key].order < tab.order)
				return tabs[key];
			return tab;
		}, null);

		yield put(actions.selectTab({code: tab.code}));
	}
}

function* newTab() {
	const tabs = yield select(tabSelector.getTabs);
	const order = tabs.reduce((val, t) => t.get('order') > val ? t.get('order') : val, 0);
	const tab = {
		code: uuid(),
		name: 'Новая вкладка',
		order: order + 1,
		hotKeys: []
	};
	try {
		yield put(actions.createTab.request({tab}));
		yield put(actions.selectTab({code: tab.code}));
		const retailPointId = yield select(getPointId);
		yield call(dataContext.saveTab, retailPointId, tab);
	} catch (e) {
		yield put(notify.error('Не удалось создать вкладку'));
		//yield put(actions.createTab.request({tab}));
		//todo delay save tab?
	}
}

function* debounceSaveTab() {
	yield debounce(actionEnum.UPDATE_TAB, saveTab);
}

//region keys

function* searchProduct({query = ''}) {
	try {
		const retailPointId = yield select(getPointId);
		const response = yield call(productDataContext.getProducts, retailPointId, 0, 50, {filter: query});
		yield put(actions.searchProduct.success({products: response.productsList}));
	}
	catch (error) {
		yield put(actions.searchProduct.failure({error}));
	}
}

function* debounceSearchProduct() {
	yield debounce(actionEnum.SEARCH_PRODUCT.REQUEST, searchProduct);
}

function* searchCategory({query = ''}) {
	try {
		const retailPointId = yield select(getPointId);
		const response = yield call(productDataContext.getItemGroups, retailPointId, 0, 50, query);
		yield put(actions.searchCategory.success({categories: response.categoryList}));
	}
	catch (error) {
		yield put(actions.searchCategory.failure({error}));
	}
}

function* debounceSearchCategory() {
	yield debounce(actionEnum.SEARCH_CATEGORY.REQUEST, searchCategory);
}

function* debounceSaveKey() {
	yield debounce(actionEnum.SAVE_KEY, saveKey);
}

function* saveKey({key}) {
	yield call(saveTabAndHotKeys, key.tabCode);
}

function* checkDraggedKey({id, row, col, gridSize}) {
	const validator = new GridValidator(gridSize.width, gridSize.height);
	const keys = yield select(tabSelector.getActiveKeys);
	const otherKeys = keys.filter(s => s.get('id') !== id).toJS();
	const key = keys.find(s => s.get('id') === id).toJS();
	if (key == null)
		return;

	const model = {...key, row, col};
	if (validator.isValidCord(model) && !validator.intersect(model, otherKeys)) {
		yield put(actions.saveKey({key: model}));
	}
}


//region category
function* openCategory({categoryId, gridSize, tabCode}) {
	const grid = new GridCreator(gridSize.width, gridSize.height);
	grid.add({type: HOT_KEY_TYPE.BACK, tabCode});
	yield put(actions.setCategoryKeys({keys: grid.getResult(), finish: false}));

	try {
		const retailPointId = yield select(getPointId);
		const response = yield call(productDataContext.getProducts, retailPointId, 0, 50, {groupId: categoryId});

		response.productsList.forEach(item => {
			grid.add({
				type: HOT_KEY_TYPE.PRODUCT,
				name: item.name,
				color: DEFAULT_COLOR,
				tabCode: tabCode
			})
		});
		yield put(actions.setCategoryKeys({keys: grid.getResult(), finish: true}));
	}
	catch (error) {
		yield put(actions.setCategoryKeys({keys: grid.getResult(), finish: true}));
		yield put(notify.error('Не удалось получить товары для категории'));
	}
}

function* backFromCategory({tabCode}) {
	yield put(actions.selectTab({code: tabCode}));
}

export function* init() {
	try {
		yield takeEvery(actionEnum.GET_HOT_KEYS.REQUEST, getTabs);
		yield takeEvery(actionEnum.GET_HOT_KEYS.SUCCESS, setTabs);
		yield takeEvery(actionEnum.NEW_TAB, newTab);
		yield takeEvery(actionEnum.REMOVE_TAB.REQUEST, removeTab);
		yield fork(debounceSaveTab);
		yield fork(debounceSaveKey);
		yield fork(debounceSearchProduct);
		yield fork(debounceSearchCategory);
		yield takeEvery(actionEnum.OPEN_CATEGORY, openCategory);
		yield takeEvery(actionEnum.BACK_FROM_CATEGORY, backFromCategory);
		yield takeEvery(actionEnum.DRAG_END_KEY, checkDraggedKey);

		yield put(actions.getHotKeysList.request({start: 0, count: 50}));

	} catch (ee) {
		logger.log('cashbox init saga', ee);
	} finally {
		logger.log('task finally');
	}
}

export default function*() {
	yield [
		fork(subscribeToUrl, '/hotkeys', init)
	]
}