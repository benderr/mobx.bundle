import api from 'core/api';
import * as employeeMapper from './employeeMapper';

export function getAgents({query}) {
  const model = {
    filterBy: {
      agentPartName: query || ''
    }
  };
  return api.v2().agents().get(model).then(response => {
    if (response && response.data && response.data.Elements) {
      return {
        agents: response.data.Elements.map(employeeMapper.toClientEmployee),
        next: response.data.Next
      };
    }
    return {agents: [], next: null};
  });
}

