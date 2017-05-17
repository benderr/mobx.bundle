/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import React from 'react';
import { Link } from 'react-router-dom'

class ProductActions extends React.Component {
    render() {
        return ( <div class="title_actions">
            <Link class="button light small" to="/products/export">Экспорт</Link>
            <Link class="button light small" to="/products/import">Импорт</Link>
            <Link class="button small icon-plus" to="/product/1">Добавить товар</Link>
        </div>)
    }
}
export default ProductActions