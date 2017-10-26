import React from 'react';
import {observer, inject} from 'mobx-react';
import EmployeeList from '../components/EmployeeList/EmployeeList'
@observer
class EmployeesPage extends React.Component {

  render() {
    return (<EmployeeList />);
  }
}

export default EmployeesPage;
