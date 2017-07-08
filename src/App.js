import React, { Component } from 'react';
import './App.css';
import Product from './products/ProductEdit'
import ProductList from './products/ProductList'
import ProductAdd from './products/ProductAdd'
import ProductEdit from './products/ProductEdit'
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={ProductList}/>
          <Route exact path="/addProduct" component={ProductAdd}/>
          <Route exact path="/Product/:id" component={Product}/>
          <Route exact path="/Product/:id/edit" component={ProductEdit}/>
        </Switch>
      </div>
    );
  }
}

export default App;
