import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getProducts} from '../actions/productActions';
import ProductList from '../components/ProductListComponent';

import retailPointHOC from '../retailPointHOC';

@retailPointHOC
class ProductListContainer extends React.Component {
    componentDidMount() {
        const {retailPoint, getProducts} = this.props;
        if (retailPoint) {
            const id = retailPoint.toObject().id;
            getProducts(id, 0, 50);
        }
    }

    render() {
        const {products} = this.props;
        return (<div>
            {products ? <ProductList items={products.toObject()}/> : null}
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        retailPoint: state.account.get('retailPoint'),
        error: state.products.get('error'),
        products: state.products.get('data')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: bindActionCreators(getProducts.request, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
