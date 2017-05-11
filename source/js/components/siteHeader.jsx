import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {logOut} from 'modules/account/actions/loginActions'
import {connect} from 'react-redux';

const Header = props => {
    const {dispatch} = props;
    const _logOut = () => {
        dispatch(logOut())
    };

    return (
        <header>
            <div class="header_logo">
                <Link to="/">
                    Модульбанк
                </Link>
            </div>

            <div class="header_search">

                <input type="search" value="" placeholder="" class="drop-target" data-position="top left" required/>

                <div class="name">Поиск</div>
            </div>

            <div class="header_menu free_items">
                <div class="header_menu_inner">
                    <ul>
                        <li>
                            <NavLink to="/finance" activeStyle={{
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}><span>List</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/finance/1" exact={true} activeStyle={{
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}><span>L1</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/route-test" exact={true} activeStyle={{
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}><span>L2</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/route-test2" exact={true} activeStyle={{
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}><span>L3</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/list-example2/second" exact={true} activeStyle={{
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}><span>L2/sec</span></NavLink>
                        </li>


                        {/*<li>*/}
                            {/*<NavLink to="/finance" activeStyle={{*/}
                                {/*fontWeight: 'bold',*/}
                                {/*textDecoration: 'underline'*/}
                            {/*}}><span>Fin</span></NavLink>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>

            <div class="header_profile">
                <div class="header_profile_name">
                    <a href="#" class="icon-profile drop-target" data-theme="drop_profile">{props.name}</a>
                    <div class="drop-content">
                        <div class="drop-content-inner">
                            <ul class="drop-menu">
                                <li><a class="icon-plus add_company">Подключить компанию</a></li>
                            </ul>
                            <div class="pdb_info">
                                Подарим бесплатное <br/>обслуживание для новой <br/>и текущей компании<br/>
                                <a class="link">Подробнее</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="header_profile_settigs">
                    <a href="#" class="icon-settings"></a>
                </div>

                <div class="header_profile_logout">
                    <a onClick={_logOut} class="icon-logout"></a>
                </div>
            </div>
        </header>
    );
};

export default connect()(Header);
//export default Header;
