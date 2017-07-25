import {createSelector} from 'reselect'
import {Map, List} from 'immutable';

export const getSection = (state) => {
	return state.get('productModifiers');
};

export const getSearchGroups = (formKey) => createSelector([getSection], data => {
	return data.getIn(['searchGroupsResult', formKey], Map({
		loading: false,
		groups: List([]),
		error: null
	}));
});

export const getGroups = (inventCode) => createSelector([getSection], data => {
	return data.get('groups').filter(s => s.get('inventCode') == inventCode && !s.get('isNew')).toList();
});

export const getGroupByCode = (groupCode) => createSelector([getSection], data => {
	return data.getIn(['groups', groupCode]);
});
