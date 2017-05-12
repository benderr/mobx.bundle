import React from 'react';
import ProductList from '../components/ProductListComponent';

class ProductListContainer extends React.Component {
    render() {
        const items=[{
            code:123123,
            name: "Молоко Лебедевское, 2,5%",
            price: 50.00

        },
            {
                code:343434,
                name: "Ряженка Фермерская, 0,5лРяженка Фермерская, 0,5лРяженка Фермерская, 0,5л Ряженка Фермерская, 0,5л",
                price: 330.00

            }];
        return (<div>
            <ProductList items={items}/>
        </div>);
    }
}

export default  ProductListContainer