import React, { Component } from 'react'
import  { graphql } from 'react-apollo'
import { addProduct, fetchAllProducts } from '../graphql/products.graph'
import ProductList from './ProductList'
import { Container, Row, Col, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap'

class ProductAdd extends Component {
  constructor () {
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

  render () {
    return (
      <Container>
        <Row>
          <Col xs="4">
            <form onSubmit={this.addProduct}>
              <h3>Add Product to Cart</h3>

              <InputGroup size="sm">
                <InputGroupAddon>Name</InputGroupAddon>
                <Input className="form-control" id="name" type="text" onChange={(evt) => this.setState({name: evt.target.value}) }/>
              </InputGroup><br />
              <InputGroup size="sm">
                <InputGroupAddon>Description</InputGroupAddon>
                <Input className="form-control" id="description" type="text" onChange={(evt) => this.setState({description: evt.target.value})}/>
              </InputGroup><br />
              <InputGroup size="sm">
                <InputGroupAddon>Price</InputGroupAddon>
                <Input className="form-control" id="price" type="text" onChange={(evt) => this.setState({price: evt.target.value})}/>
              </InputGroup><br />
              <InputGroup>
                <Button size="sm" color="primary" type="submit" block>Add Product</Button>
              </InputGroup>
            </form>
        </Col>
        <Col xs="8">
          <h3>These are the products in your cart
            <hr/>
          </h3>
          <ProductList/>
        </Col>
      </Row>
      </Container>
    )
  }
}

export default graphql(addProduct)(ProductAdd)
