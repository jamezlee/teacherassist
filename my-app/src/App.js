import React, { Component } from 'react';

import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
import MainPage from './Containers/MainPage/MainPage';
import Register from './Containers/Register/Register';
import Retrieve from './Containers/Retrieve/Retrieve';
import SendNotification from './Containers/SendNotification/SendNotification';
import Suspend from './Containers/SuspendStudent/SuspendStudent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Layout >
            <Switch>
            <Route path="/send" component={SendNotification} />
            <Route path="/retrieve" component={Retrieve} />
            <Route path="/register" component={Register} />
            <Route path="/suspend" component={Suspend} />
            <Route path="/" exact component={MainPage} />
            </Switch>
          </Layout>
        </div>
      </div>
    );
  }
}

export default App;
