import React, {Component} from 'react'
import  { graphql } from 'react-apollo'
import {addProduct, fetchAllProducts} from '../graphql/products.graph'
import ProductList from './ProductList'

class ProductAdd extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            price: 0,
            description: ''
        }
    }

    addProduct = (evt) => {
        evt.preventDefault()
        this.props.mutate({
            refetchQueries: [{
                query: fetchAllProducts
            }],
            variables: {
                ...this.state,
                price: parseFloat(this.state.price)
            }
        })
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <form onSubmit={this.addProduct}>
                            <h3>Add A Product</h3>
                            <input placeholder="Product Name" type="text" onChange={(evt) => this.setState({ name: evt.target.value }) } />
                            <input placeholder="Product Price" type="text" onChange={(evt) => this.setState({price: evt.target.value})}/>
                            <input placeholder="Product Description" type="text" onChange={(evt) => this.setState({description: evt.target.value})}/>
                            <button type="submit">Add It!</button>
                        </form>
                    </div>
                    <div className="col-md-9">
                        <h3>These are the products in your DB<hr/></h3>
                        <ProductList/>
                    </div>
                </div>

            </div>
        )
    }
}

export default graphql(addProduct)(ProductAdd)
