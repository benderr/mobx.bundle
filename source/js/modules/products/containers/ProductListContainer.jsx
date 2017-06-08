import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router'
import PropTypes from 'prop-types';
import {getProducts, createProduct} from '../actions/productActions';
import ProductList from '../components/ProductsList/ProductListComponent';
import ProductActions from '../components/ProductsList/ProductActions';
import {getProductsList, getProductListTotalCount, getProductLoading} from '../selectors/productsSelectors'
import toJs from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';

class ProductListContainer extends React.Component {

    componentDidMount() {
        this.start = 50;
        this.count = 50;
        this.filtred = false;
        // this.getProductsList();
    }

    createProduct() {
        const {catalog = 'INVENTORY', createProduct} = this.props; //todo каталог
        createProduct({catalog});
    }

    openProduct(code, point) {
        const {push}=this.props;
        push({pathname: `/product/view/point/${point}/catalog/INVENTORY/code/${code}`}); //todo каталог
    }

    getProductsList() {
        const {selectedPoint, getProducts, productsTotalCount} = this.props;

        if (productsTotalCount >= this.start) {
            getProducts(selectedPoint, this.start, this.count);
            this.start += this.count;
        }
    }

    onFilterChanged(event) {
        let value = event.target.value;
        const {selectedPoint, getProductsByFilter} = this.props;
        this.start = 0;
        if (value && value.length > 2) {
            this.filtred = true;
            getProductsByFilter(selectedPoint, this.start, this.count, value);
        } else if (!value && this.filtred) {
            getProductsByFilter(selectedPoint, this.start, this.count);
        }
    }

    render() {
        const {products, selectedPoint, loading} = this.props;
        return (<div>
            <div class="title_panel">

                <h1>Все товары</h1>

                <ProductActions onCreateProduct={::this.createProduct}/>
            </div>
            <ProductList items={products} openProduct={::this.openProduct} selectedPoint={selectedPoint}
                         loadNext={::this.getProductsList} onFilterChanged={::this.onFilterChanged} loading={loading}/>
        </div>);
    }
}


function mapStateToProps(state, ownProps) {
    return {
        //error: state.products.get('error'),
        products: getProductsList(state),
        productsTotalCount: getProductListTotalCount(state),
        loading: getProductLoading(state)
    }
}


//todo https://docs.mobify.com/progressive-web/latest/guides/best-practices-guide/
function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            getProducts: getProducts.request,
            getProductsByFilter: getProducts.requestWithFilter,
            push: push,
            createProduct: createProduct
        }, dispatch)
    }
}

ProductListContainer.propTypes = {
    selectedPoint: PropTypes.string.isRequired,
    //products: arrayOf(ProductShape).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(retailPointHOC(toJs(ProductListContainer)));
