import {gql} from 'react-apollo'

export const fetchAllProducts = gql`{
 allProducts (first: 100) {
    id
    name
    description
    price
    }
}`

export const addProduct = gql`
mutation ($name: String! $price: Float $description: String!) {
    createProduct(
        name: $name
        price: $price
        description: $description
    ) {
        id
        name
        description
        price
    }
}
`

export const removeProduct = gql`
  mutation ($id: ID!){
      deleteProduct(id: $id){
          id
      }
  }
`