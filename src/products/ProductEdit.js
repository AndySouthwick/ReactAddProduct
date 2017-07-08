import React, { Component } from 'react'
import  { graphql } from 'react-apollo'

import { Container, Row, Col, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap'

import { getProduct, updateProduct } from '../graphql/products.graph'
import { Redirect } from 'react-router'


class ProductEdit extends Component {
  constructor (props) {
    super(props)
      this.state = {
      redirect: false
      }
  }

  updateProduct = (evt) => {

      evt.preventDefault()
     // if (this.state.hasOwnProperty('price')){
     //    this.setState({
     //        price: parseInt(this.state.price, 10)
     //    })
     //     console.log(this.state)
     // }

    this.props.mutate({
      variables: {
          ...this.props.data.Product,

          ...this.state



      }
    }).then(() => this.setState({ redirect: true })).catch((err) => {
      console.error(err)
    })

  }

  render () {

      const { redirect } = this.state;
      if (redirect) {
          return <Redirect to='/addProduct'/>;
      }

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
                       onChange={(evt) => this.setState({price: parseFloat(evt.target.value)})}/>
              </InputGroup><br />
              <InputGroup>
                <Button size="sm" color="primary" type="submit">Update Product</Button>
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