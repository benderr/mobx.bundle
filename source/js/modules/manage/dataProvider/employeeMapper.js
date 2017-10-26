export const toClientEmployee = agent => {
  return {
    id: agent.Id,
    email: agent.Email,
    firstName: agent.FirstName,
    lastName: agent.LastName,
    groupId: agent.GroupId,
    groupName: agent.GroupName
  };
};
