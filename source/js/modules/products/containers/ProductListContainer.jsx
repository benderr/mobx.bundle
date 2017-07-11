import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getProducts, createProduct} from '../actions/productActions';
import ProductList from '../components/ProductsList/ProductListComponent';
import ProductActions from '../components/ProductsList/ProductActions';
import {
    getProductsList,
    getProductListTotalCount,
    getProductLoading,
    getNoProductsState
} from '../selectors/productsSelectors'
import toJs from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import {getSection} from 'modules/account/selectors/accountSelectors';

class ProductListContainer extends React.Component {

    componentDidMount() {
        this.start = 50;
        this.count = 50;
        this.filtred = false;
    }

    exportProduct() {
        const {token}=this.props;
        const [protocol, _, host] = window.location.href.split("/").slice(0, 3);
        const downloadLink = document.createElement("a");
        const values = atob(token).split(':');
        const email = values[0];
        const password = values[1];
        downloadLink.href = `${protocol}//${email}:${password}@${host}/api/v1/download-catalog`;
        downloadLink.download = "catalog.xls";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    createProduct() {
        this.props.createProduct();
    }

    openProduct(code, point) {
        const {push}=this.props;
        push({pathname: `/product/view/point/${point}/code/${code}`});
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
        const {products, selectedPoint, loading, noProducts} = this.props;
        const showPanel = !noProducts && !loading;

        return (
            <div>
                <div class="title_panel">

                    <h1>Все товары</h1>

                    {showPanel &&
                    <ProductActions onCreateProduct={::this.createProduct}
                                    onExportProduct={::this.exportProduct}/>}
                </div>

                {!noProducts &&
                <ProductList items={products}
                             openProduct={::this.openProduct}
                             selectedPoint={selectedPoint}
                             loadNext={::this.getProductsList}
                             onFilterChanged={::this.onFilterChanged}
                             loading={loading}/>
                }

                {noProducts &&
                <div class="center_xy  page_center_info  page_center_info__products0">
                    <i class="icon icon_box_empty"></i>
                    <div class="title">Список товаров пуст</div>
                    <p>Добавьте товар или импортируйте из своего файла</p>
                    <div class="form_buttons  row">
                        <button class="button small icon-plus" onClick={::this.createProduct}>Добавить товар</button>
                        <Link class="button button_file_upload small light  ml8" to="/products/import">Импортировать из
                            файла</Link>
                    </div>
                </div>}
            </div>);
    }
}


function mapStateToProps(state, ownProps) {
    return {
        //error: state.products.get('error'),
        products: getProductsList(state),
        noProducts: getNoProductsState(state),
        productsTotalCount: getProductListTotalCount(state),
        loading: getProductLoading(state),
        token: getSection(state).get('token')
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
    selectedPoint: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(retailPointHOC(toJs(ProductListContainer)));
