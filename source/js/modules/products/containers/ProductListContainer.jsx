import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {getProducts} from '../actions/productActions';
import ProductList from '../components/ProductListComponent';
import ProductActions from '../components/ProductActions'
// import ProductMap from '../model/ProductMap'

import retailPointHOC from '../components/retailPointRequiredHOC';

class ProductListContainer extends React.Component {
    componentDidMount() {
        const {selectedPoint, getProducts} = this.props;
        getProducts(selectedPoint, 0, 50);
    }

    render() {
        const {products} = this.props;
        return (<div>
            <div class="title_panel">

                <h1>Все товары</h1>

                <ProductActions/>
            </div>
            {products ? <ProductList items={products}/> : null}
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        error: state.products.get('error'),
        products: state.products.get('productsList')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: bindActionCreators(getProducts.request, dispatch)
    }
}

ProductListContainer.propTypes = {
    selectedPoint: PropTypes.string.isRequired,
    //products: PropTypes.instanceOf(List).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(retailPointHOC(ProductListContainer));
