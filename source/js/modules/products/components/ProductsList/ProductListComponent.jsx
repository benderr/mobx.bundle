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

    getInfinateScroll(loading, next, count, listLength = 50) {
        let className = 'table_row';
        if (loading) {
            className += ' loading_block';
        }

        return <div class={className}>
            {count >= listLength && <Waypoint
                scrollableAncestor={window}
                onEnter={next}/>}
        </div>
    }

    render() {
        const {items, openProduct, selectedPoint, loadNext, onFilterChanged, onSortChanged, loading} = this.props;
        const productItems = items.map(product => <ProductItem item={ product } key={product.inventCode}
                                                               onProductClick={() => openProduct(product.inventCode, selectedPoint)}/>);

        let infinateScroll = this.getInfinateScroll(loading, loadNext, items.length);
        return (
            <div class='widget_block'>
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
                    {infinateScroll}
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
