import React from 'react';
import {Link} from 'react-router-dom';
import SignIn from '../components/SignIn/SignIn';
import {observer, inject} from 'mobx-react';

@inject('historyStore')
@observer
class SignInPage extends React.Component {

  handleGoToSearch() {
    this.props.historyStore.fullReload('/companies');
  }

  render() {
    return (
      <div class='login'>
        <header class='login_header'>
          <a href='#'><strong>Модуль</strong>Бухгалтерия</a>
        </header>
        <div class='login_section'>
          <div class='login_section_center'>
            <div class='login_content'>
              <SignIn />
            </div>
            <div className='login_links'>
              <Link to='/forgot'>Забыли пароль?</Link>
              <a onClick={::this.handleGoToSearch}>Поиск компании</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInPage;
