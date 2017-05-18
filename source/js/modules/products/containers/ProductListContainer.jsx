import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router'
import PropTypes from 'prop-types';

import {getProducts} from '../actions/productActions';
import ProductList from '../components/ProductListComponent';
import ProductActions from '../components/ProductActions'
// import ProductMap from '../model/ProductMap'

import retailPointHOC from '../components/retailPointRequiredHOC';

@retailPointHOC
class ProductListContainer extends React.Component {
    componentDidMount() {
        const {selectedPoint, getProducts} = this.props;
        getProducts(selectedPoint, 0, 50);
    }

    render() {
        const {products, openProduct} = this.props;
        return (<div>
            <div class="title_panel">

                <h1>Все товары</h1>

                <ProductActions/>
            </div>
            {products ? <ProductList items={products} openProduct={openProduct}/> : null}
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
        getProducts: bindActionCreators(getProducts.request, dispatch),
        openProduct: (code) => {
            dispatch(push({pathname: '/product/' + code}))
        }
    }
}

ProductListContainer.propTypes = {
    selectedPoint: PropTypes.string.isRequired,
    //products: PropTypes.instanceOf(List).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
