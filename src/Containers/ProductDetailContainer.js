import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProductDetail from '../Components/ProductDetail';
import {add_to_shopping_cart} from '../Actions/productsAction';

class ProductDetailContainer extends Component{
  constructor(props){
    super(props);
  }

  getSelectedProduct(selectedProductID){
    if (this.props.products){
      for (var index = 0; index < this.props.products.length; index++){
        if (this.props.products[index].id == selectedProductID){
          return this.props.products[index];
        }
      }
    }
    return null;
  }

  render(){
    return(
      <ProductDetail
        addToShoppingCart = {this.props.addToShoppingCart}
        selectedProduct = {this.getSelectedProduct(this.props.selectedProductID)}
        handleProductDetailClose={this.props.handleProductDetailClose}
        showDetailModal={this.props.showDetailModal} />)
  }
}

function mapStateToProps(state){
  return {
    products : state.Products.products,
    selectedProductID : state.Products.clickedProductID
  }

}

function mapDispatchToProps(dispatch){
  return {
    addToShoppingCart : (product_id) => {
      dispatch(add_to_shopping_cart(product_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);
