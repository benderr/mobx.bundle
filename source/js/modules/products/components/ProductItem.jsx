/**
 * Created by RobertSabiryanov on 11.05.17.
 */
import React from 'react';
import productItemType from './productItemType';

class ProductItem extends React.Component {
    render() {
        const {item} = this.props;
        return (<div class='table_row  row_link  row_link'>
            <div class='product_id'>item.code</div>
            <div class='product_name'>item.name</div>
            <div class='product_price'>item.price</div>
        </div>);
    }
}

ProductItem.propTypes = {
    item: productItemType.isRequired
};

export default ProductItem;
