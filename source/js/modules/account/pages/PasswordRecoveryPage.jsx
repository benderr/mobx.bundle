import React from 'react';
import { Link } from 'react-router-dom';
import PasswordRecovery from '../components/PasswordRecovery/PasswordRecovery';

export default class PasswordRecoveryPage extends React.Component {

  render() {
    return (
      <div class='login'>
        <header class='login_header'>
          <Link to="/"><strong>Модуль</strong>Бухгалтерия</Link>
        </header>
        <div class='login_section'>
          <div class='login_section_center'>
            <div class='login_content'>
              <PasswordRecovery />
            </div>
            <div className='login_links'>
              <Link to='/signin'>Войти</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
