import React, {Component} from 'react'

import { graphql } from 'react-apollo'
import {fetchAllProducts} from '../graphql/products.graph'

class ProductList extends Component{
    render(){

        let { data: { allProducts } } = this.props;
        allProducts = (allProducts) ? allProducts : [];
        console.log(allProducts)
        return(
            <div>

                    {allProducts.map(({ id, name, description, price }) => (
                        <h4 key={id}>{name} | {description} | ${price}</h4>
                    ))}


            </div>
        )

    }
}
export default graphql(fetchAllProducts, {
    fetchPolicy: 'network-only'
})(ProductList)