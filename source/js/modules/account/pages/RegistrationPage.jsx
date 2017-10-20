import React from 'react';
import Registration from '../components/Registration/Registration';
import { Link } from 'react-router-dom';

export default class RegistrationPage extends React.Component {
  render() {
    return (
      <div class='login'>
        <header class='login_header'>
          <Link to="/"><strong>Модуль</strong>Бухгалтерия</Link>
        </header>
        <div class='login_section'>
          <div class='login_section_center'>
            <div class='login_content'>
              <Registration />
            </div>
            <div className='login_links'>
              <Link to='/forgot'>Забыли пароль?</Link>
              <Link to='/signin'>Войти</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}