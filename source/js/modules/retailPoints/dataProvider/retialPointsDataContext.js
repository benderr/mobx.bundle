import api from 'infrastructure/api/api';
import {toServer} from './retailPointsMapper';

export const getRetailPoints = () => {
	return api.v1().retailpoints().get().then(res => res.data);
};

export const addRetailPoint = (point) => {
	//
	return api.v1().retailpoints().post(toServer(point), {querystring: 'type=BLANK'}).then(res => res.data);
};