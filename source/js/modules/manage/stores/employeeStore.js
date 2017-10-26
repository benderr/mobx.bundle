import {observable, action, isObservable} from 'mobx';
import {asyncAction} from 'mobx-utils';
import * as dataContext from '../dataProvider/employeeDataContext';

class EmployeeStore {

  @observable
  loading = false;
  employees = [];


  // @action.bound
  // fetchEmployees = asyncAction(function*({query}) {
  //   this.loading = true;
  //   try {
  //     const {agents, next} = yield dataContext.getAgents({query});
  //     //this.profile = json;
  //
  //   } catch (err) {
  //     this.error = err.toString();
  //     throw err;
  //   } finally {
  //     this.loading = false;
  //   }
  // });
}

export default new EmployeeStore();