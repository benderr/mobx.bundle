import {observable, action} from 'mobx';


class PreviewStore {
	@observable loading = true;
}


const self = new PreviewStore();
export default self;