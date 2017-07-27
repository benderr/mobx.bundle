import {Map, List, fromJS} from 'immutable';
import * as actions from '../actions/shopDocsActions';

export const initialState = Map({
	loading: false,
	noItems: false,
	documents: List([]),
	error: null,
	docsFilter: Map({
		start: 0,
		totalCount: null,
		count: null
	}),
	docViews: Map({})
});

export const actionHandlers = {
	[actions.GET_DOCUMENTS.REQUEST]: (state, action) => {
		return state.merge({loading: true});
	},
	[actions.SEARCH_DOCUMENTS]: (state, action) => {
		return state.merge({loading: true});
	},
	[actions.GET_DOCUMENTS.SUCCESS]: (state, {totalCount, pos, documents}) => {
		const filter = state.getIn(['docsFilter', 'filter']);
		return state.merge({
			loading: false,
			noItems: (filter == null || !filter.get('query')) && totalCount == 0,
			documents: pos > 0 ? state.get('documents').concat(fromJS(documents)) : fromJS(documents)
		}).setIn(['docsFilter', 'totalCount'], totalCount);
	},
	[actions.GET_DOCUMENTS.FAILURE]: (state, {error}) => {
		return state.merge({loading: false, error: fromJS(error)});
	},

	[actions.SET_FILTER]: (state, {filter}) => {
		if (filter.restart) {
			const newFilter = filter;
			newFilter.start = 0;
			newFilter.totalCount = null;
			return state.mergeIn(['docsFilter'], fromJS(newFilter));
		}
		return state.mergeIn(['docsFilter'], fromJS(filter));
	},
	[actions.CORRECT_FILTER]: (state, {pos}) => {
		const count = state.getIn(['docsFilter', 'count'], 0);
		return state.setIn(['docsFilter', 'start'], pos + count);
	},
	[actions.GET_DOCUMENT_DETAILS.REQUEST]: (state, {id}) => {
		if (!state.getIn(['docViews', id])) {
			return state.setIn(['docViews', id], fromJS({loading: true}));
		}
		else {
			return state.mergeIn(['docViews', id], fromJS({loading: true}));
		}
	},
	[actions.GET_DOCUMENT_DETAILS.SUCCESS]: (state, {document}) => {
		return state.mergeIn(['docViews', document.id], fromJS({loading: false, document}));
	},
	[actions.GET_DOCUMENT_DETAILS.FAILURE]: (state, {id, error}) => {
		return state.mergeIn(['docViews', id], fromJS({loading: false, error}));
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
