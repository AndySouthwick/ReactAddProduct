import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import { Table, Container, Row, Col, Button } from 'reactstrap'
import { fetchAllProducts, removeProduct } from '../graphql/products.graph'

class ProductList extends Component {
  handleRemoveProduct = (product) => {
    this.props.mutate({
      refetchQueries: [{
        query: fetchAllProducts
      }],
      variables: {
        id: product.id
      }
    })
  }

  render () {

    let {data: {allProducts}} = this.props
    allProducts = (allProducts) ? allProducts : []
    console.log(allProducts)

    const productList = allProducts.map((productList, idx) => {
        return (<tr key={idx}>
                  <td>{productList.name}</td>
                  <td>{productList.description}</td>
                  <td>{productList.price}</td>
                  <td className="text-center">
                    <Button color="danger" size="sm" onClick={() => this.handleRemoveProduct(productList)}>X</Button>
                  </td>
                </tr>)})

    return (
      <Container>
        <Row>
          <Col>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th className="text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {productList}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}

const productQuery =  graphql(fetchAllProducts, {
  options: {fetchPolicy: 'network-only' }
})(ProductList)

const productMutation = graphql(removeProduct)(productQuery)

export default productMutation