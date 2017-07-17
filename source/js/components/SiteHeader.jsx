import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {logOut} from 'modules/account/actions/loginActions'
import {Route} from 'react-router'
import {Drop} from 'common/uiElements';
import toJs from 'components/HOC/toJs'
import {push} from 'connected-react-router'

import {getCurrentRetailPointId, getRetailPointList} from 'modules/retailPoints/selectors/retailPointSelectors'
import * as retailPointActions from 'modules/retailPoints/actions/retailPointActions';

const SiteMenuLink = ({label, to, exact}) => (
    <Route path={to} exact={exact} children={({match}) => (
        <li className={match ? 'active' : ''}>
            <Link to={to}><span>{label}</span></Link>
        </li>
    )}/>
);

const mapStateToProps = (state) => ({
    selectedPointId: getCurrentRetailPointId(state),
    points: getRetailPointList(state),
});

const mapActionsToProps = dispatch => ({
    ...bindActionCreators({
        onSelectPoint: retailPointActions.setRetailPoint,
        push: push,
        logOut: logOut
    }, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
@toJs
class SiteHeader extends React.Component {

    openRetailPointsList() {
        const {push} = this.props;
        push({pathname: '/retail-points/'});
    }

    getSelectedPointName(selectedPointId, points) {
        if (selectedPointId && points) {
            const selectedPoint = points.filter(point => point.id === selectedPointId)[0];
            return selectedPoint.name;
        }
        return 'no name';
    }

    render() {
        const {selectedPointId, points, onSelectPoint, logOut} = this.props;
        const selectedPointName = this.getSelectedPointName(selectedPointId, points);

        const pointsBlock = selectedPointId && points ? points.filter(point => point.id !== selectedPointId)
                .map(point => (
                    <li key={'listitem_' + point.id} onClick={() => onSelectPoint(point.id)}><a>{point.name}</a></li>))
            : null;


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
                            <SiteMenuLink to="/discount" label="Скидки"/>
                            <SiteMenuLink to="/documents" label="Документы"/>
                            <SiteMenuLink to="/" exact={true} label="Товары"/>
                            {/*<SiteMenuLink to="/#" label="Статистика"/>*/}
                            <SiteMenuLink to="/hotkeys" label="Касса"/>
                        </ul>
                    </div>
                </div>

                <div class="header_profile">

                    <div class="header_profile_name">
                        <Drop position="bottom left">
                            <a class="icon-pos drop-target" name="label"><span>{selectedPointName}</span></a>

                            <div class="drop-content">
                                <div class="drop-content-inner">
                                    <ul class="drop-menu f_small">
                                        {pointsBlock}
                                        <li><a class="icon-settings" onClick={::this.openRetailPointsList}>Все точки
                                            продаж</a></li>
                                    </ul>
                                </div>
                            </div>
                        </Drop>
                    </div>

                    <div class="header_profile_settigs">
                        <Link to="/settings" class="icon-settings"></Link>
                    </div>
                    <div class="header_profile_logout">
                        <a onClick={logOut} class="icon-logout"></a>
                    </div>
                </div>
            </header>
        );
    }
}

export default SiteHeader;
