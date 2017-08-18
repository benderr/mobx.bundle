/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJs from 'components/HOC/toJs'

import {
    addRetailPoint,
    setEmptyRetailPointInLayer,
    getRetailPoint,
    editRetailPoint,
    deleteRetailPoint
} from '../actions/retailPointActions';
import {getRetailPointList, getRetailPointInLayer} from '../selectors/retailPointSelectors';

import DefaultLayerLayout from 'components/DefaultLayerLayout';
import RetailPointForm from '../components/RetailPointForm/RetailPointForm';
import {ConfirmPopupService} from 'common/uiElements';

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

            mock: {
                enabled: props.get('demoProducts'),
            },
            type: props.get('productsSource'),
            source: props.get('retailPoints'),
            id: props.get('id'),
            isNew: props.get('isNew'),
            settings: {
                egaisSettings: {
                    kpp: props.getIn(['settings', 'egaisSettings', 'kpp']),
                },
                defaultVatTag: props.getIn(['settings', 'defaultVatTag']),
                fiscalServiceEnabled: props.getIn(['settings', 'fiscalServiceEnabled'])
            }
        };

        const {addRetailPoint, editRetailPoint} = this.props;
        if (retailPoint.isNew) {
            addRetailPoint(retailPoint);
        } else {
            editRetailPoint(retailPoint);
        }

        this.closeLayer();
    }

    onDelete() {
        const {id, deleteRetailPoint} = this.props;
        this.confirmPopup.open()
            .then(() => {
                deleteRetailPoint(id);
                this.closeLayer();
            });
    }

    render() {
        const {id, points, initialValues} = this.props;
        const layer = initialValues[id];
        const retailPoint = layer && layer.retailPoint;
        const loading = layer && layer.loading;
        const h1Title = retailPoint && retailPoint.isNew ? 'Добавление точки продаж' : 'Редактирование точки продаж';

        return (
            <article class="page" {...this.layerOptions}>
                <div class="page_header">
                    {this.getCloseButton()}
                    {this.getToggleButton()}
                    <h1>{h1Title}</h1>
                </div>
                <RetailPointForm onSave={::this.onSave}
                                 onCancel={::this.closeLayer}
                                 loading={loading}
                                 points={points}
                                 retailPoint={retailPoint}
                                 onDelete={::this.onDelete}/>
                <ConfirmPopupService
                    ref={p => this.confirmPopup = p}
                    okName="Подтвердить"
                    cancelName="Отмена"
                    title="Удалить точку продаж?"
                    text="Все созданные товары и другие данные этой точки будут удалены. Вы хотите подтвердить операцию?"/>
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
            deleteRetailPoint: deleteRetailPoint.request,
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditRetailPointContainer);