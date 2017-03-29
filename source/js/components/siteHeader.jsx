import React from 'react';
import {IndexLink, Link} from 'react-router';

export  default () => {
    return (
        <header>
            <div className="header_logo">
                <IndexLink to="/">
                    Модульбанк
                </IndexLink>
            </div>

            <div className="header_search">

                <input type="search" value="" placeholder="" className="drop-target" data-position="top left" required/>

                <div className="name">Поиск</div>
            </div>

            <div className="header_menu free_items">
                <div className="header_menu_inner">
                    <ul>
                        <li className="active"><IndexLink to="/test-selector"><span>Деньги</span></IndexLink></li>
                        <li><Link to="/list-example">Пример списка</Link></li>
                    </ul>
                </div>
            </div>

            <div className="header_profile">
                <div className="header_profile_name">
                    <a href="#" className="icon-profile drop-target" data-theme="drop_profile">ООО «Хлебзавод №5»</a>
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
                    <Link to="/signin"  className="icon-logout"></Link>
                </div>
            </div>
        </header>
    );
};

