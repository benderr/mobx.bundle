import React from 'react';
import {Link} from 'react-router-dom';
import {Route} from 'react-router'
import {Drop} from 'common/uiElements';
import {ConfirmPopupService} from 'common/uiElements'

const SiteMenuLink = ({label, to, exact}) => (
    <Route path={to} exact={exact} children={({match}) => (
        <li className={match ? 'active' : ''}>
            <Link to={to}><span>{label}</span></Link>
        </li>
    )}/>
);


class SiteHeader extends React.Component {

    handleLogOut() {

    }

    render() {

        return (

            <header>
                <div class="header_logo">
                    <a href="#">Модульбанк</a>
                </div>

                <div class="header_menu free_items">
                    <div class="header_menu_inner">
                        <ul>
                            <SiteMenuLink to="/" exact={true} label="Главная"/>
                            <SiteMenuLink to="/documents" label="Документы"/>
                        </ul>
                    </div>
                </div>

                <div class="header_profile">

                    <div class="header_profile_name">
                        <a>User name</a>
                    </div>

                    <div class="header_profile_settigs">
                        <Link to="/settings" class="icon-settings"></Link>
                    </div>
                    <div class="header_profile_logout">
                        <a onClick={::this.handleLogOut} class="icon-logout"></a>
                    </div>
                </div>
            </header>
        );
    }
}

export default SiteHeader;
