import React from 'react';
import {observer, inject} from 'mobx-react';
import CompanySearch from '../components/CompanySearch'

@observer
class CompaniesPage extends React.Component {

  render() {
    return (<CompanySearch/>);
  }
}

export default CompaniesPage;
