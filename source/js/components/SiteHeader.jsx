import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import {Link} from 'react-router-dom';
import {Drop} from 'modul-components';
import {withRouter} from 'react-router';

const SiteMenuLink = ({label, to, exact}) => (
  <Route
    path={ to } exact={ exact } children={ ({match}) => (
    <li className={ match ? 'active' : '' }>
      <Link to={ to }><span>{label}</span></Link>
    </li>
  ) }/>
);

const SiteMenuDrop = ({label, to, children}) => (
  <Route
    path={ to } exact={ false } children={ ({match}) => (
    <li className={ match ? 'active' : '' }>
      <Drop drop={{position: 'bottom left'}}>
        <a className="icon-submenu drop-target">{label}</a>
        <div class="drop-content">
          <div class="drop-content-inner">
            {children}
          </div>
        </div>
      </Drop>
    </li>
  ) }/>
);

class OutSiteLink extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    history: PropTypes.object.isRequired
  };

  handleClick(e) {
    const {to, history}=this.props;
    history.push(to);
    e.preventDefault();
  }

  render() {
    const {to, label}=this.props;
    return <a onClick={e => this.handleClick(e)} href={to}>{label}</a>
  }
}


@inject(({profileStore}) => ({
  logout: profileStore.logout,
  profile: profileStore.profile,
}))
@withRouter
@observer
class SiteHeader extends React.Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  handleLogOut() {
    this.props.logout();
  }

  isShowMenu(route, groups) {
    if (['reports', 'manage'].indexOf(route) > -1)
      return groups.includes('admin') || groups.includes('teamLeader');
    return true;
  }

  // getMenu(groups) {
  //   let menu = [{to: '/', exact: true, label: 'Задачи'}];
  //   if (groups.includes('admin') || groups.includes('teamLeader')) {
  //     menu = menu.concat([
  //       {to: '/reports', exact: true, label: 'Отчеты'},
  //       {to: '/users', exact: true, label: 'Управление'},
  //     ]);
  //   }
  //   return menu.map((props, key) => <SiteMenuLink { ...props } key={ key }/>);
  // }

  render() {
    const {profile: {lastName, firstName, groups}} = this.props;
    return (
      <header>
        <div class='header_logo'>
          <a href='#'>Модульбанк</a>
        </div>

        <div class='header_menu free_items'>
          <div class='header_menu_inner'>
            <ul>
              <SiteMenuLink to="/" exact={true} label="Задачи"/>
              {this.isShowMenu('reports', groups) && <SiteMenuLink to="/reports" exact={true} label="Отчеты"/>}
              {this.isShowMenu('manage', groups) && <SiteMenuDrop to="/manage" label="Управление">
                <ul class="drop-menu">
                  <li><OutSiteLink history={this.props.history} to="/manage/employees" label="Сотрудники"/></li>
                </ul>
              </SiteMenuDrop>}
            </ul>
          </div>
        </div>

        <div class='header_profile'>
          <div class='header_profile_name'>
            <Link to='/profile'>{`${ lastName } ${ firstName }`}</Link>
          </div>

          <div class='header_profile_settigs'>
            <Link to='/settings' class='icon-settings'/>
          </div>
          <div class='header_profile_logout'>
            <a onClick={ ::this.handleLogOut } class='icon-logout'/>
          </div>
        </div>
      </header>
    );
  }
}

export default SiteHeader;
