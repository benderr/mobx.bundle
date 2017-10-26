import {observable, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import historyStore from 'modules/core/stores/historyStore';
import * as dataContext from '../dataProvider/clientDataContext';

class ClientsStore {
  @observable clients = new Map();
  @observable error = undefined;
  @observable inProgress = false;

  @action.bound
  create = asyncAction(function* (params) {
    this.inProgress = true;
    this.error = undefined;
    try {
      const tempClient = params;
      // console.log(data)
      const data = yield dataContext.create(params);
      this.clients.set(data.data, tempClient);
    } catch (error) {
      this.error = error;
      throw error;
    } finally {
      this.inProgress = false;
    }
  });

  @action.bound
  getClient = asyncAction(function* (key) {
    this.inProgress = true;
    this.error = undefined;
    try {
      const params = this.clients.get(key);
      const response = yield dataContext.getClient(params);
      return response.data.params;
    } catch (error) {
      this.error = error;
      throw error;
    } finally {
      this.inProgress = false;
    }
  })

  @action.bound
  update = asyncAction(function* (key, params) {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.update(params);
      this.clients.set(key, params);
    } catch (error) {
      this.error = error;
      throw error;
    } finally {
      this.inProgress = false;
    }
  })

}

export default new ClientsStore();
