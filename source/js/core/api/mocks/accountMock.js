export default (mock) => {
  return mock.onGet('/api/account').reply(200, {
    'FirstName': '123',
    'LastName': 'Админ',
    'MiddleName': '',
    'Title': '',
    'Gender': 'Male',
    'Email': 'test002@test.ru',
    'AvatarId': null,
    'Notifications': [
      {
        'NotificationType': 'TaskAssignedToGroup',
        'IsActive': false,
        'Title': 'Оповещать о диалогах группы',
      },
      {
        'NotificationType': 'TaskAssignedOrResumedToAgent',
        'IsActive': false,
        'Title': 'Оповещать о моих диалогах',
      }],
  });
};
