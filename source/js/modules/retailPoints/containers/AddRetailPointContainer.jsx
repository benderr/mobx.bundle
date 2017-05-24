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
    onSave(data) {
        const {addRetailPoint} = this.props;
        addRetailPoint(data);
    }

    render() {
        return (
            <article class="page">
                <div class="page_header">
                    {this.getCloseButton()}
                    {this.getToogleButton()}
                    <h1>Добавление точки продаж</h1>
                </div>
                <RetailPointForm onSave={::this.onSave} onCancel={::this.closeLayer}/>

            </article>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addRetailPoint: bindActionCreators(addRetailPoint.request, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(AddRetailPointContainer);