/**
 * Created by RobertSabiryanov on 11.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
const {arrayOf} = PropTypes;

import ProductShape from './ProductShape';
import ProductItem from './ProductItem';


class ProductListComponent extends React.Component {
    render() {
        const {items, openProduct} = this.props;
        const productItems = items.map(product => <ProductItem item={ product } key={product.inventCode} onProductClick={()=>openProduct(product.inventCode)}/>);

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
                        />
                    </div>
                    {productItems}
                </div>
            </div>
        );
    }
}

ProductListComponent.propTypes = {
    items: arrayOf(ProductShape).isRequired,
    openProduct: PropTypes.func.isRequired
};

export default ProductListComponent;
