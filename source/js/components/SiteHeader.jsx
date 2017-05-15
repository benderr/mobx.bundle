import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {logOut} from 'modules/account/actions/loginActions'
import {connect} from 'react-redux';
import {Route} from 'react-router'

const SiteMenuLink = ({label, to, exact}) => (
    <Route path={to} exact={exact} children={({match}) => (
        <li className={match ? 'active' : ''}>
            <Link to={to}><span>{label}</span></Link>
        </li>
    )}/>
)

const SiteHeader = props => {
    const {dispatch} = props;
    const _logOut = () => {
        dispatch(logOut())
    };

    const companyName = props.company ? props.company.get('name') : 'no name';

    return (
        <header>
            <div class="header_logo">
                <a href="#">Модульбанк</a>
            </div>

            <div class="header_search">

                <input type="search" value="" placeholder="" class="drop-target" data-position="top left"/>

                <div class="name">Поиск</div>
            </div>

            <div class="header_menu free_items">
                <div class="header_menu_inner">
                    <ul>
                        <SiteMenuLink to="/" exact={true} label="Товары"/>
                        <SiteMenuLink to="/statistics" label="Статистика"/>
                        <SiteMenuLink to="/cash" label="Касса"/>
                        <SiteMenuLink to="/contragents" label="Контрагенты"/>
                        <SiteMenuLink to="/documents" label="Документы"/>
                        {/*<li><a><span>Статистика</span></a></li>*/}
                        {/*<li class="active"><a><span>Товары</span></a></li>*/}
                        {/*<li><a><span>Касса</span></a></li>*/}
                        {/*<li><a><span>Контрагенты</span></a></li>*/}
                        {/*<li><a><span>Документы</span></a></li>*/}

                    </ul>
                </div>
            </div>

            <div class="header_profile">

                <div class="header_profile_name">
                    <a href="#" class="icon-profile drop-target" data-theme="drop_profile">{companyName}</a>
                    {/*<div class="drop-content">*/}
                    {/*<div class="drop-content-inner">*/}
                    {/*<ul class="drop-menu">*/}
                    {/*<li><a class="icon-plus add_company">Подключить компанию</a></li>*/}
                    {/*</ul>*/}
                    {/*<div class="pdb_info">*/}
                    {/*Подарим бесплатное <br/>обслуживание для новой <br/>и текущей компании<br/>*/}
                    {/*<a class="link">Подробнее</a>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </div>

                <div class="header_profile_logout">
                    <a onClick={_logOut} class="icon-logout"></a>
                </div>
            </div>
        </header>
    );
};

export default connect()(SiteHeader);
