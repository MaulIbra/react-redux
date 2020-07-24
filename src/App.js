import React, {Component} from 'react';
import './App.css';
import MainPages from "./pages/main-pages/MainPages";
import {BrowserRouter} from "react-router-dom";

class App extends Component {

    render() {
      return (
          <BrowserRouter>
            <MainPages/>
          </BrowserRouter>
    );
  }
}

export default App;
