import {ApolloClient, createNetworkInterface} from 'react-apollo'

const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj4bfxvkvf30e0172khag7cyt'
})

const client = new ApolloClient({
    networkInterface
})

export  default client