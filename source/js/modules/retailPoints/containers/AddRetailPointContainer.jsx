/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addRetailPoint} from '../actions/retailPointActions';

import DefaultLayerLayout from 'components/DefaultLayerLayout';
import RetailPointForm from '../components/RetailPointForm/RetailPointForm'

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
        const {loading} = this.props;
        return (
            <article class="page">
                <div class="page_header">
                    {this.getCloseButton()}
                    {this.getToggleButton()}
                    <h1>Добавление точки продаж</h1>
                </div>
                <RetailPointForm onSave={::this.onSave} onCancel={::this.closeLayer} loading={loading}/>
            </article>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addRetailPoint: bindActionCreators(addRetailPoint.request, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(AddRetailPointContainer);