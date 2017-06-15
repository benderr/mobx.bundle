import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {logOut} from 'modules/account/actions/loginActions'
import {connect} from 'react-redux';
import {Route} from 'react-router'
import {Drop2} from 'common/uiElements';


//todo допилить это непотребство
const SiteMenuLink = ({label, to, exact}) => (
    <Route path={to} exact={exact} children={({match}) => (
        <li className={match ? 'active' : ''}>
            <Link to={to}><span>{label}</span></Link>
        </li>
    )}/>
);

const SiteHeader = props => {
    // let drop = null;
    // constructor(props, context) {
    //     super(props, context);
    //     this.state = {};
    // }
    // function toggleDrop() {
    //     drop.toggle();
    // }

    const {dispatch} = props;
    const _logOut = () => {
        dispatch(logOut())
    };

    //console.log('render header');

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
                        <SiteMenuLink to="/contragents" label="Контрагенты"/>
                        <SiteMenuLink to="/#" label="Документы"/>
                        <SiteMenuLink to="/" exact={true} label="Товары"/>
                        <SiteMenuLink to="/#" label="Статистика"/>
                        <SiteMenuLink to="/#" label="Касса"/>
                    </ul>
                </div>
            </div>

            <div class="header_profile">

                <div class="header_profile_name">

                    <Drop2 opts={{position:'bottom right'}}>
                        <a class="icon-profile drop-target" name="label"><span>{companyName}</span></a>

                        <div class="drop-content">
                            <div class="drop-content-inner">
                                <ul class="drop-menu f_small">
                                    <li><a class="icon-check">{companyName}</a></li>
                                    <li><a>Ленинский проспект</a></li>
                                    <li><a>Ленинский проспект 2</a></li>
                                    <li><a>Ленинский проспект 3</a></li>
                                    <li><a>Бульвар Славы</a></li>
                                    <li><a>Бульвар Славы (Веранда)</a></li>
                                    <li><a>Бульвар Славы (Авто)</a></li>
                                    <li><a class="icon-settings">Все точки продаж</a></li>
                                </ul>
                            </div>
                        </div>
                    </Drop2>
                </div>

                <div class="header_profile_settigs">
                    <Link to="/settings" class="icon-settings"></Link>
                </div>
                <div class="header_profile_logout">
                    <a onClick={_logOut} class="icon-logout"></a>
                </div>
            </div>
        </header>
    );
};


// SiteHeader.propTypes = {
//     onSave: PropTypes.func.isRequired,
//     onCancel: PropTypes.func.isRequired,
//     onDelete: PropTypes.func.isRequired,
//     loading: PropTypes.bool,
//     points: PropTypes.arrayOf(RetailPointShape),
//     retailPoint: RetailPointShape
// };

export default connect()(SiteHeader);
