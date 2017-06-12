/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJs from 'components/HOC/toJs'

import {addRetailPoint, setEmptyRetailPointInLayer} from '../actions/retailPointActions';
import {getRetailPointList, getRetailPointInLayer} from '../selectors/retailPointSelectors';

import DefaultLayerLayout from 'components/DefaultLayerLayout';
import RetailPointForm from '../components/RetailPointForm/RetailPointForm'

@toJs
class AddRetailPointContainer extends DefaultLayerLayout {
    componentDidMount() {
        super.componentDidMount();
        const {points, setEmptyRetailPointInLayer} = this.props;
        // if (urlAction == 'view')
        //     getDetails({inventCode, point, catalog});
        // if (urlAction == 'add' && productView == null)
        //     setNewProduct({catalog, inventCode});
        const isFirstPoint = !points || points.length === 0;
        setEmptyRetailPointInLayer(isFirstPoint);
    }

    onSave(props) {
        let retailPoint = {
            name: props.get('name'),
            address: props.get('address'),
            phone: props.get('phone'),
            inn: props.get('inn'),
            kpp: props.get('kpp'),
            mock: {
                enabled: props.get('demoProducts'),
            },
            type: props.get('productsSource'),
            source: props.get('retailPoints')
        };

        const {addRetailPoint} = this.props;
        addRetailPoint(retailPoint);
        this.closeLayer();
    }

    render() {
        const {loading, points, initialValues} = this.props;
        return (
            <article class="page" {...this.layerOptions}>
                <div class="page_header">
                    {this.getCloseButton()}
                    {this.getToggleButton()}
                    <h1>Добавление точки продаж</h1>
                </div>
                <RetailPointForm onSave={::this.onSave} onCancel={::this.closeLayer} loading={loading} points={points}
                                 initialValues={initialValues}/>
            </article>)
    }
}

const mapState = state => ({
    points: getRetailPointList(state),
    initialValues: getRetailPointInLayer(state)
});

const mapDispatchToProps = dispatch => {
    return {
        addRetailPoint: bindActionCreators(addRetailPoint.request, dispatch),
        setEmptyRetailPointInLayer: bindActionCreators(setEmptyRetailPointInLayer, dispatch),
    }
};

export default connect(mapState, mapDispatchToProps)(AddRetailPointContainer);