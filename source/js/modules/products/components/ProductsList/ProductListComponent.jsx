/**
 * Created by RobertSabiryanov on 11.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
const {arrayOf} = PropTypes;

import ProductShape from './ProductShape';
import ProductItem from './ProductItem';

import Waypoint from 'react-waypoint';


class ProductListComponent extends React.Component {
    render() {
        const {items, openProduct, selectedPoint, loadNext, onFilterChanged, onSortChanged, loading} = this.props;
        const productItems = items.map(product => <ProductItem item={ product } key={product.inventCode}
                                                               onProductClick={() => openProduct(product.inventCode, selectedPoint)}/>);
        let className = 'widget_block';
        if (loading) {
            className += ' loading_block';
        }
        return (



            <div class={className}>
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
                    {items && items.length >= 50 && <Waypoint
                        scrollableAncestor={window}
                        onEnter={loadNext}/>}
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
    loading: PropTypes.boolean
}

export default ProductListComponent;
