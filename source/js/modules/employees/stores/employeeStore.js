import {observable, action, isObservable} from 'mobx';
import {asyncAction} from 'mobx-utils';
//import * as dataContext from '../dataProvider/accountDataContext';

class EmployeeStore {

  @action.bound
  getProfile = asyncAction(function*() {
    this.inProgress = true;
    try {
      //const json = yield dataContext.getAccount();
      //this.profile = json;
      return 'success';
    } catch (err) {
      this.error = err.toString();
      throw err;
    } finally {
      this.inProgress = false;
    }
  });
}

export default new EmployeeStore();