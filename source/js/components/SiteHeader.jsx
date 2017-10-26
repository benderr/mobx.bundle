import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import {Link} from 'react-router-dom';

const SiteMenuLink = ({label, to, exact}) => (
  <Route
    path={ to } exact={ exact } children={ ({match}) => (
      <li className={ match ? 'active' : '' }>
        <Link to={ to }><span>{label}</span></Link>
      </li>
  ) } />
);

@inject(({profileStore}) => ({
  logout: profileStore.logout,
  profile: profileStore.profile,
}))
@observer
class SiteHeader extends React.Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  handleLogOut() {
    this.props.logout();
  }

  getMenu(groups) {
    let menu = [{to: '/', exact: true, label: 'Задачи'}];
    if (groups.includes('admin') || groups.includes('teamLeader')) {
      menu = menu.concat([
        {to: '/reports', exact: true, label: 'Отчеты'},
        {to: '/users', exact: true, label: 'Управление'},
        {to: '/clients', exact: true, label: 'Клиенты'},
      ]);
    }
    return menu.map((props, key) => <SiteMenuLink { ...props } key={ key } />);
  }

  render() {
    const {profile: {lastName, firstName, groups}} = this.props;
    const menu = this.getMenu(groups);
    return (
      <header>
        <div class='header_logo'>
          <a href='#'>Модульбанк</a>
        </div>

        <div class='header_menu free_items'>
          <div class='header_menu_inner'>
            <ul>
              {menu}
            </ul>
          </div>
        </div>

        <div class='header_profile'>
          <div class='header_profile_name'>
            <Link to='/profile'>{`${ lastName } ${ firstName }`}</Link>
          </div>

          <div class='header_profile_settigs'>
            <Link to='/settings' class='icon-settings' />
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
