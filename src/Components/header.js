import React, { Component } from 'react';
import SearchBar from './SearchBar';

class Header extends Component {
  render() {
    return (
      <div className="App">
        <div className="logo">
        </div>

        <SearchBar />

        <div className="logo">
        </div>
      </div>
    );
  }
}

export default Header;
