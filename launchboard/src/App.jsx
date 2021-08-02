import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./Global.css";

import Home from "./pages/Home";
import Pool from "./pages/PoolDetail";
import PoolList from "./pages/PoolList";

import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from 'ethers';

import {Provider} from 'react-redux';
import store from './store';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <BrowserRouter>
          <Provider store={store}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pool" component={Pool} />
              <Route exact path="/pool_list" component={PoolList} />
            </Switch>
          </Provider>
        </BrowserRouter>
      </div>
    </Web3ReactProvider>
  );
};

export default App;
