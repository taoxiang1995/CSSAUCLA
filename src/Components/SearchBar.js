import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

class SearchBar extends Component {
  constructor (props)
  {
    super(props);

  }

  render() {
    return (
      <div className="searchBar">
        <input className="searchBox" placeholder="   Search"/>
      </div>
    );
  }
}

export default SearchBar;
