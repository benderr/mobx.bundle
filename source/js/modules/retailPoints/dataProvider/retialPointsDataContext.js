import * as mapper from './accountMapper'
import api from 'infrastructure/api/api'

function getRetailPoints() {
	return api.v1().retailpoints().get().then(res => res.data);
}

export {getRetailPoints}
