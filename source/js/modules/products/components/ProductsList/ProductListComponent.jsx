/**
 * Created by RobertSabiryanov on 11.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
const {arrayOf} = PropTypes;

import ProductShape from './ProductShape';
import ProductItem from './ProductItem';

import {InfinateScroll} from 'common/uiElements'


class ProductListComponent extends React.Component {

    render() {
        const {items, openProduct, selectedPoint, loadNext, onFilterChanged, onSortChanged, loading} = this.props;
        const productItems = items.map(product => <ProductItem item={ product } key={product.inventCode}
                                                               onProductClick={() => openProduct(product.inventCode, selectedPoint)}/>);

        const notFound = !loading && productItems.length == 0 ?
            (<div class="searching_results">
                <div class="light_block">По запросу ничего не найдено</div>
            </div>) : null;

        return (
            <div class='widget_block' style={{minHeight: '100px'}}>
                <div class='table  table_products'>
                    <div class='table_head'>
                        <div class='product_id'>Код</div>
                        <div class='product_name'>Наименование</div>
                        <div class='product_price'>Цена</div>
                    </div>
                    <div class='table_row  row_link_search'>
                        <input
                            type='search' class='small  w100'
                            placeholder='Введите код, наименование или цену товара'
                            onChange={onFilterChanged}
                        />
                    </div>
                    {productItems}
                    {notFound}
                    <InfinateScroll loadNext={loadNext} totalCount={items.length} listLength={50} loading={loading}/>
                </div>
            </div>
        );
    }
}

ProductListComponent.propTypes = {
    items: arrayOf(ProductShape).isRequired,
    openProduct: PropTypes.func.isRequired,
    selectedPoint: PropTypes.string.isRequired,
    loadNext: PropTypes.func,
    onFilterChanged: PropTypes.func.isRequired,
    loading: PropTypes.bool
}

export default ProductListComponent;
