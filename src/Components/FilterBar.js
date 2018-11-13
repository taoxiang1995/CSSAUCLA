import React, { Component } from 'react';
import { Router, Route, nk, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {request_category_product, fetchProducts} from '../Actions/productsAction';
import '../css/FilterBar.css';



class FilterBar extends Component {
  constructor (props)
  {
    super(props);
    this.state = {
      selectedFilterID : 0
    }

  }

  removeOldFilterActiveClass(id){
    document.getElementById(id).classList.remove('active');
  }

  addFilterActiveClass(id){
    document.getElementById(id).classList.add('active');
  }

  handleFilterClick(e){
    this.props.setCurrentFilterID(this.state.selectedFilterID);
    this.removeOldFilterActiveClass(this.state.selectedFilterID);
    this.setState({
      selectedFilterID : e.target.getAttribute('id')
    })
    this.addFilterActiveClass(e.target.getAttribute('id'));
    e.target.innerHTML != 'Featured' && this.props.dispatch(request_category_product(e.target.innerHTML));
    e.target.innerHTML == 'Featured' && this.props.dispatch(fetchProducts());
  }

  render() {
    return (
      <div onClick={this.handleFilterClick.bind(this)}  className="filterContainer">
        <div id='0' className="filter active">Featured</div>
        <div id='1' className="filter">Furniture</div>
        <div id='2' className="filter">Electronics</div>
        <div id='3' className="filter">Books</div>
        <div id='4' className="filter">Clothes</div>
        <div id='5' className="filter">Others</div>
      </div>
    );
  }
}

export default connect(null, null)(FilterBar);
