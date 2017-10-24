import {observable, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import historyStore from 'modules/core/stores/historyStore';
import * as dataContext from '../dataProvider/clientDataContext';

class ClientsStore {
  @observable clients = [];
  @observable error = undefined;

  @action.bound
  create = asyncAction(function* (params) {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.create(params);
    } catch (error) {
      this.error = error;
      throw error;
    } finally {
      this.inProgress = false;
    }
  });

  @action.bound
  update = asyncAction(function* (params) {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.create(params);
      this.inProgress = false;
      return 'success';
    } catch (error) {
      this.error = error;
      throw error;
    } finally {
      this.inProgress = false;
    }
  })

}

export default new ClientsStore();
