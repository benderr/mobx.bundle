/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJs from 'components/HOC/toJs'

import {addRetailPoint, setEmptyRetailPointInLayer, getRetailPoint, editRetailPoint} from '../actions/retailPointActions';
import {getRetailPointList, getRetailPointInLayer} from '../selectors/retailPointSelectors';

import DefaultLayerLayout from 'components/DefaultLayerLayout';
import RetailPointForm from '../components/RetailPointForm/RetailPointForm'

@toJs
class AddEditRetailPointContainer extends DefaultLayerLayout {
    componentDidMount() {
        super.componentDidMount();
        const {id, action, points, setEmptyRetailPointInLayer, getRetailPoint} = this.props;
        if (action === 'edit') {
            getRetailPoint(id);
        }
        if (action === 'add') {
            const isFirstPoint = !points || points.length === 0;
            setEmptyRetailPointInLayer(id, isFirstPoint);
        }

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
            source: props.get('retailPoints'),
            id: props.get('id')
        };

        const {addRetailPoint, editRetailPoint} = this.props;
        if(retailPoint.isNew){
            addRetailPoint(retailPoint);
        }else {
            editRetailPoint(retailPoint);
        }

        this.closeLayer();
    }

    render() {
        const {id, loading, points, initialValues} = this.props;
        const retailPoint = initialValues[id] && initialValues[id].retailPoint;

        const h1Title = retailPoint && retailPoint.isNew ? 'Добавление точки продаж' : 'Редактирование точки продаж';

        return (
            <article class="page" {...this.layerOptions}>
                <div class="page_header">
                    {this.getCloseButton()}
                    {this.getToggleButton()}
                    <h1>{h1Title}</h1>
                </div>
                <RetailPointForm onSave={::this.onSave} onCancel={::this.closeLayer} loading={loading} points={points}
                                 retailPoint={retailPoint}/>
            </article>)
    }
}

const mapStateToProps = (state, ownProps) => {
    const {action, id} = ownProps.computedMatch.params;
    return {
        id,
        action,
        points: getRetailPointList(state),
        initialValues: getRetailPointInLayer(state)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            addRetailPoint: addRetailPoint.request,
            editRetailPoint: editRetailPoint.request,
            setEmptyRetailPointInLayer: setEmptyRetailPointInLayer,
            getRetailPoint: getRetailPoint.request,
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditRetailPointContainer);