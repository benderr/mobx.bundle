import api from 'infrastructure/api/api';
import {toServer} from './retailPointsMapper';

export const getRetailPoints = () => {
	return api.v1().retailpoints().get().then(res => res.data);
};

export const addRetailPoint = (point) => {
	let querystringArr=[];
	let type = point.type;
	if(type=== 'BLANK' && point.mock.enabled)
		type = 'DEMO';
	querystringArr.push(`type=${type}`);
	if(point.source){
		querystringArr.push(`source=${point.source}`);
	}
	let querystring = querystringArr.join('&');
	return api.v1().retailpoints().post(toServer(point), {querystring}).then(res => res.data);
};

export const getRetailPoint = ({id}) => {
	return api.v1().retailpoint(id).get().then(res => res.data);
};