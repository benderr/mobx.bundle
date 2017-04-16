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
            <div className="header_logo">
                <Link to="/">
                    Модульбанк
                </Link>
            </div>

            <div className="header_search">

                <input type="search" value="" placeholder="" className="drop-target" data-position="top left" required/>

                <div className="name">Поиск</div>
            </div>

            <div className="header_menu free_items">
                <div className="header_menu_inner">
                    <ul>
                        <li className="active"><Link to="/list-example"><span>Sel1</span></Link></li>
                        <li><Link to="/list-example2">Sel1</Link></li>
                        <li><Link to="/list-example2/second">Sel3</Link></li>
                        <li><Link to="/finance">Fin</Link></li>
                    </ul>
                </div>
            </div>

            <div className="header_profile">
                <div className="header_profile_name">
                    <a href="#" className="icon-profile drop-target" data-theme="drop_profile">{props.name}</a>
                    <div className="drop-content">
                        <div className="drop-content-inner">
                            <ul className="drop-menu">
                                <li><a className="icon-plus add_company">Подключить компанию</a></li>
                            </ul>
                            <div className="pdb_info">
                                Подарим бесплатное <br/>обслуживание для новой <br/>и текущей компании<br/>
                                <a className="link">Подробнее</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header_profile_settigs">
                    <a href="#" className="icon-settings"></a>
                </div>

                <div className="header_profile_logout">
                    <a onClick={_logOut} className="icon-logout"></a>
                </div>
            </div>
        </header>
    );
};

export default connect()(Header);
//export default Header;
