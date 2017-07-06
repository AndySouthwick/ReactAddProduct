import React, { Component } from 'react'
import  { graphql } from 'react-apollo'

import { Container, Row, Col, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap'

import { getProduct } from '../graphql/products.graph'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      description: ''
    }
  }


// let {data: {getProduct}} = this.props
// getProduct = (getProduct) ? getProduct : []
// console.log(getProduct)

  render () {
    if (this.props.data.loading) {
      return <h1>Loading</h1>
    }

    if (this.props.data.hasOwnProperty('Product') && this.props.data.Product === null){
      return null
    }

    const product = this.props.data.Product

    return (
      <Container>
        <Row>
          <Col>
            <form onSubmit={this.updateProduct}>
              <h3>Update Product</h3>
              <Row>
                <Col xs="4">
                  <InputGroup size="sm">
                    <InputGroupAddon>Name</InputGroupAddon>
                    <Input className="form-control" id="name" type="text" defaultValue={product.name} onChange={(evt) => this.setState({ name: evt.target.value })}/>
                  </InputGroup>
                </Col>
                <Col xs="4">
                  <InputGroup size="sm">
                    <InputGroupAddon>Description</InputGroupAddon>
                    <Input className="form-control" id="description" type="text"defaultValue={product.description} onChange={(evt) => this.setState({ description: evt.target.value })}/>
                  </InputGroup>
                </Col>
                <Col xs="4">
                  <InputGroup size="sm">
                    <InputGroupAddon>Price</InputGroupAddon>
                    <Input className="form-control" id="price" type="text" defaultValue={product.price} onChange={(evt) => this.setState({ price: evt.target.value })}/>
                  </InputGroup>
                </Col>
                <Row/>
                <Row>
                  <Col>
                    <InputGroup>
                    <br /><Button size="sm" color="primary" type="submit">Update Product</Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
  )
  }
  }

  export default graphql(getProduct, {
    options: (ownProps) => ({
    variables: { id: ownProps.match.params.id }
  })
  })(Product)