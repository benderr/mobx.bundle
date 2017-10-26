import api from 'core/api';
import * as employeeMapper from './dataMapper';

export function getCompany({phone, inn}) {
  const model = {
    filterBy: {
      phone, inn
    }
  };
  return api.searchcompanies().get(model).then(response => {
    return response.data;
  });
}

