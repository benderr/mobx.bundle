import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const SiteMenuLink = ({ label, to, exact }) => (
  <Route
    path={ to } exact={ exact } children={ ({ match }) => (
      <li className={ match ? 'active' : '' }>
        <Link to={ to }><span>{label}</span></Link>
      </li>
    ) } />
);

@inject(({ profileStore }) => ({
  getProfile: profileStore.getProfile,
  logout: profileStore.logout,
}))
@withRouter
@observer
class SiteHeader extends React.Component {
  static propTypes = {
    getProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleLogOut() {
    const { logout, history } = this.props;
    logout().then(() => {
      history.replace('/signin');
    });
  }

  render() {
    return (
      <header>
        <div class='header_logo'>
          <a href='#'>Модульбанк</a>
        </div>

        <div class='header_menu free_items'>
          <div class='header_menu_inner'>
            <ul>
              {/* <SiteMenuLink to='/' exact={ true } label='Главная' />*/}
              {/* <SiteMenuLink to='/documents' label='Документы' />*/}
            </ul>
          </div>
        </div>

        <div class='header_profile'>

          <div class='header_profile_name'>
            <a>User name</a>
          </div>

          <div class='header_profile_settigs'>
            {/* <Link to='/settings' class='icon-settings' />*/}
          </div>
          <div class='header_profile_logout'>
            <a onClick={ ::this.handleLogOut } class='icon-logout' />
          </div>
        </div>
      </header>
    );
  }
}

export default SiteHeader;
