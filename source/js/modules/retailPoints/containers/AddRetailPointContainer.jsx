/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJs from 'components/HOC/toJs'

import {addRetailPoint} from '../actions/retailPointActions';
import {getRetailPointList} from '../selectors/retailPointSelectors'

import DefaultLayerLayout from 'components/DefaultLayerLayout';
import RetailPointForm from '../components/RetailPointForm/RetailPointForm'

@toJs
class AddRetailPointContainer extends DefaultLayerLayout {
    onSave(props) {
        let retailPoint = {
            name: props.get('name'),
            address: props.get('address'),
            phone: props.get('phone'),
            inn: props.get('inn'),
            kpp: props.get('kpp'),
            mock: {
                enabled: props.get('demoProducts'),
            }
        };

        const {addRetailPoint} = this.props;
        addRetailPoint(retailPoint);
        this.closeLayer();
    }

    render() {
        const {loading, points} = this.props;
        return (
            <article class="page" {...this.layerOptions}>
                <div class="page_header">
                    {this.getCloseButton()}
                    {this.getToggleButton()}
                    <h1>Добавление точки продаж</h1>
                </div>
                <RetailPointForm onSave={::this.onSave} onCancel={::this.closeLayer} loading={loading} points={points}/>
            </article>)
    }
}

const mapState = state => ({
    points: getRetailPointList(state),
});

const mapDispatchToProps = dispatch => {
    return {
        addRetailPoint: bindActionCreators(addRetailPoint.request, dispatch),
    }
};

export default connect(mapState, mapDispatchToProps)(AddRetailPointContainer);