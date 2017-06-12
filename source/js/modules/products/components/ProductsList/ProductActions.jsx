import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductActions extends React.Component {
    static propTypes = {
        onCreateProduct: PropTypes.func.isRequired
    };

    render() {
        return ( <div class="title_actions">
            <Link class="button light small" to="/products/export">Экспорт</Link>
            <Link class="button light small" to="/products/import">Импорт</Link>
            <button class="button small icon-plus" onClick={this.props.onCreateProduct}>Добавить товар</button>
        </div>)
    }
}

export default ProductActions