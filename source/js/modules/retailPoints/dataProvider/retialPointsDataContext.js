import api from 'infrastructure/api/api';
import {toServer} from './retailPointsMapper';

export const getRetailPoints = () => {
	return api.v1().retailpoints().get().then(res => res.data);
};

export const addRetailPoint = (point) => {
	let type = point.mock.enabled ? 'type=DEMO' : 'type=BLANK';
	return api.v1().retailpoints().post(toServer(point), {querystring: type}).then(res => res.data);
};

export const getRetailPoint = (pointId) => {
	return api.v1().retailpoint(pointId).get().then(res => res.data);
};