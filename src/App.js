import React, { Component } from 'react';
import './App.css';
import ProductList from './products/ProductList'
import ProductAdd from './products/ProductAdd'
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
        <Route path="/list" component={ProductList}/>
      </Switch>
        <Switch>
          <Route path="/addProduct" component={ProductAdd}/>
        </Switch>
      </div>
    );
  }
}

export default App;
