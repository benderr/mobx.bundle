import React from 'react';
import {Link} from 'react-router';
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
                        <li class="active"><Link to="/list-example"><span>Sel1</span></Link></li>
                        <li><Link to="/list-example2">Sel1</Link></li>
                        <li><Link to="/list-example2/second">Sel3</Link></li>
                        <li><Link to="/finance">Fin</Link></li>
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
