import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getProducts} from '../actions/productActions';
import ProductList from '../components/ProductListComponent';


class ProductListContainer extends React.Component {
    componentDidMount() {
        let {profile} = this.props;
        getProducts(profile.retailPointId, 0, 50);
    },
    render() {
        return (<div>
            <ProductList items={items}/>
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        profile: state.auth.get('loginInfo').profile,
        error: state.products.get('error'),
        data: state.products.get('data')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: bindActionCreators(getProducts.request, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
