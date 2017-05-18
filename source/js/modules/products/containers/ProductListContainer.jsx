import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router'
import PropTypes from 'prop-types';
import {getProducts} from '../actions/productActions';
import ProductList from '../components/ProductsList/ProductListComponent';
import ProductActions from '../components/ProductsList/ProductActions';
import {getProductsList} from '../selectors/productsSelectors'
// import ProductMap from '../model/ProductMap'

import retailPointHOC from '../components/ProductsList/retailPointRequiredHOC';

class ProductListContainer extends React.Component {
    componentDidMount() {
        const {selectedPoint, getProducts} = this.props;
        getProducts(selectedPoint, 0, 50);
    }

    render() {
        const {products, openProduct, selectedPoint} = this.props;
        return (<div>
            <div class="title_panel">

                <h1>Все товары</h1>

                <ProductActions/>
            </div>
            {products ? <ProductList items={products} openProduct={openProduct} selectedPoint={selectedPoint}/> : null}
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        error: state.products.get('error'),
        products: getProductsList(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: bindActionCreators(getProducts.request, dispatch),
        openProduct: (code, point) => {
            dispatch(push({pathname: `/product/${point}/${code}`}))
        }
    }
}

ProductListContainer.propTypes = {
    selectedPoint: PropTypes.string.isRequired,
    //products: arrayOf(ProductShape).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(retailPointHOC(ProductListContainer));
