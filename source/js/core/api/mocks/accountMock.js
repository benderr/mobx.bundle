//import mock from 'core/api/mocks'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
export default (mock)=> {
  return mock.onGet('api/account1').
    reply(200, {
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
          'Title': 'Оповещать о диалогах группы'
        },
        {
          'NotificationType': 'TaskAssignedOrResumedToAgent',
          'IsActive': false,
          'Title': 'Оповещать о моих диалогах'
        }]
    }, {'x-token': 'bc2bd2dc612e491da6e5ed62ca8f0222'}).
    onGet('api/account2').
    reply(200, {
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
          'Title': 'Оповещать о диалогах группы'
        },
        {
          'NotificationType': 'TaskAssignedOrResumedToAgent',
          'IsActive': false,
          'Title': 'Оповещать о моих диалогах'
        }]
    }, {'x-token': 'bc2bd2dc612e491da6e5ed62ca8f0222'});

}