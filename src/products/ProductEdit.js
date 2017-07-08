import React, { Component } from 'react'
import  { graphql } from 'react-apollo'

import { Container, Row, Col, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap'

import { getProduct, updateProduct } from '../graphql/products.graph'

class ProductEdit extends Component {
  constructor (props) {
    super(props)
  }

  updateProduct = (evt) => {
    evt.preventDefault()
    this.props.mutate({
      variables: {
        ...this.props.data.Product,
        ...this.state
      }
    }).then(() => {
      alert('Prodcut Edited')
    }).catch((err) => {
      console.error(err)
    })
  }

  render () {
    if (this.props.data.loading) {
      return <h1>Loading</h1>
    }

    if (this.props.data.hasOwnProperty('Product') && this.props.data.Product === null) {
      return <h1>Not Found</h1>
    }
    // else {
    // return renderForm(this.render())
    //    })
    // }

    const product = this.props.data.Product

    return (
      <Container>
        <Row>
          <Col>
            <form onSubmit={this.updateProduct}>
              <h3>Update Product</h3>

              <InputGroup size="sm">
                <InputGroupAddon>Name</InputGroupAddon>
                <Input className="form-control" id="name" type="text" defaultValue={product.name}
                       onChange={(evt) => this.setState({name: evt.target.value}) }/>
              </InputGroup><br />
              <InputGroup size="sm">
                <InputGroupAddon>Description</InputGroupAddon>
                <Input className="form-control" id="description" type="text" defaultValue={product.description}
                       onChange={(evt) => this.setState({description: evt.target.value})}/>
              </InputGroup><br />
              <InputGroup size="sm">
                <InputGroupAddon>Price</InputGroupAddon>
                <Input className="form-control" id="price" type="text" defaultValue={product.price}
                       onChange={(evt) => this.setState({price: evt.target.value})}/>
              </InputGroup><br />
              <InputGroup>
                <Button size="sm" color="primary" type="submit" block>Add Product</Button>
              </InputGroup>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

const withProduct = graphql(getProduct, {
  options: (ownProps) => ({
    variables: {id: ownProps.match.params.id}
  })
})(ProductEdit)
export default graphql(updateProduct)(withProduct)