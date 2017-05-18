/**
 * Created by RobertSabiryanov on 11.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Product from '../model/Product';

class ProductItem extends React.Component {
    render() {
        const {item, onProductClick} = this.props;
        return (<div class='table_row  row_link  row_link' onClick={onProductClick}>
            <div class='product_id'>{item.getCode()}</div>
            <div class='product_name'>{item.getName()}</div>
            <div class='product_price'>{item.getPrice()}</div>
        </div>);
    }
}

ProductItem.propTypes = {
    item: PropTypes.instanceOf(Product).isRequired,
    onProductClick: PropTypes.func.isRequired
};

export default ProductItem;
