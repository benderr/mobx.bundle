import React from 'react';
import Registration from '../components/Registration/Registration';

export default class RegistrationPage extends React.Component {
  render() {
    return (
      <div class='login'>
        <h1>
          Регистрация
        </h1>
        <Registration />
      </div>
    );
  }
}