import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

const SiteMenuLink = ({label, to, exact}) => (
  <Route
    path={ to } exact={ exact } children={ ({match}) => (
    <li className={ match ? 'active' : '' }>
      <Link to={ to }><span>{label}</span></Link>
    </li>
  ) }/>
);

@withRouter
@observer
class SectionHeader extends React.Component {

  render() {
    return (
      <header>
        <div class='header_logo'>
          <Link to="/">Модульбанк</Link>
        </div>

        <div class='header_menu free_items'>
          <div class='header_menu_inner'>
            <ul>
              <SiteMenuLink to="/companies" exact={true} label="Поиск компании"/>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default SectionHeader;
