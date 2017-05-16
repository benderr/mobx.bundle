import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {getProducts} from '../actions/productActions';
import ProductList from '../components/ProductListComponent';

import retailPointHOC from '../retailPointHOC';

@retailPointHOC
class ProductListContainer extends React.Component {
    componentDidMount() {
        const {selectedPoint, getProducts} = this.props;
        if (selectedPoint) {
            const id = selectedPoint.id;
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
        selectedPoint: state.account.get('retailPoint'),
        error: state.products.get('error'),
        products: state.products.get('data')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: bindActionCreators(getProducts.request, dispatch)
    }
}

ProductListContainer.propTypes = {
    selectedPoint: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
