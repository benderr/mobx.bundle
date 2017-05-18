/**
 * Created by RobertSabiryanov on 11.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ProductShape from './ProductShape';

class ProductItem extends React.Component {
    render() {
        const {item, onProductClick} = this.props;
        return (<div class='table_row  row_link  row_link' onClick={onProductClick}>
            <div class='product_id'>{item.inventCode}</div>
            <div class='product_name'>{item.name}</div>
            <div class='product_price'>{item.price}</div>
        </div>);
    }
}

ProductItem.propTypes = {
    item: ProductShape.isRequired,
    onProductClick: PropTypes.func.isRequired
};

export default ProductItem;
