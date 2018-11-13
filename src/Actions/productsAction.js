import axios from 'axios';
import {serverAddress} from '../config';
import { browserHistory } from 'react-router';
import { show_alert_message } from './AlertAction';
import $ from 'jquery';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
export const Will_Upload_Product = 'Will_Upload_Product';
export const Upload_Product = 'Upload_Product';
export const Did_Upload_Product = 'Did_Upload_Product';
export const ERROR_UPLOAD_PRODUCT = 'ERROR_UPLOAD_PRODUCT';
export const Clicked_Product_ID = 'Clicked_Product_ID';
export const WILL_REQUEST_CATEGORY_PRODUCT = 'WILL_REQUEST_CATEGORY_PRODUCT';
export const REQUEST_CATEGORY_PRODUCT = 'REQUEST_CATEGORY_PRODUCT';
export const DID_REQUEST_CATEGORY_PRODUCT = 'DID_REQUEST_CATEGORY_PRODUCT';
export const WILL_ADD_TO_SHOPPING_CART = 'WILL_ADD_TO_SHOPPING_CART';
export const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART';
export const DID_ADD_TO_SHOPPING_CART = 'DID_ADD_TO_SHOPPING_CART';
export const WILL_GET_BUYING_PRODUCT = 'WILL_GET_BUYING_PRODUCT';
export const GET_BUYING_PRODUCT = 'GET_BUYING_PRODUCT';
export const DID_GET_BUYING_PRODUCT = 'DID_GET_BUYING_PRODUCT';
export const WILL_GET_SELLING_PRODUCT = 'WILL_GET_SELLING_PRODUCT';
export const GET_SELLING_PRODUCT = 'GET_SELLING_PRODUCT';
export const DID_GET_SELLING_PRODUCT = 'DID_GET_SELLING_PRODUCT';
export const WILL_GET_PROFILE_STATS = 'WILL_GET_PROFILE_STATS';
export const DID_GET_PROFILE_STATS = 'DID_GET_PROFILE_STATS';

export function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  }
}


export function receiveProducts(products) {
  return {
    type: RECEIVE_PRODUCTS,
    products
  }
}

export function filterProducts (searchTerm) {
  return {
    type : FILTER_PRODUCTS,
    searchTerm
  }
}


export function fetchProducts( ) {
  return function (dispatch) {
    dispatch(requestProducts())
      axios.get(serverAddress+'api/v1/products')
        .then((response)=>{
          dispatch(receiveProducts(response.data.data.products));
        })
  }
}


export function WillUploadProduct(){
  return {
    type : Will_Upload_Product
  }
}

export function uploadProduct(product, serverAddress, base64_img, callback){
  return function (dispatch){
    dispatch(WillUploadProduct())
    $.ajax({
      beforeSend : function(xhr) {
        // debugger
        if (sessionStorage.getItem('token')) {
            xhr.setRequestHeader("Accept", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.setRequestHeader("Authorization", "Bearer " +  sessionStorage.getItem('token'));
        }
      },
      crossDomain: true,
      method: "POST",
      url: serverAddress+"api/v1/product",
      data: {
          name: product.name,
          description: product.description,
          price:product.price,
          image:base64_img,
          category:product.category
      },
    })
    .done(function(data){
      dispatch(DidUploadProduct());
      // browserHistory.push('/landingPage');
      callback();
      dispatch(show_alert_message('success', 'Congrats! You have successfully uploaded one item'));
      dispatch(fetchProducts());

    })
    .catch (function(error){
      //debugger;
      dispatch(show_alert_message('error', JSON.parse(error.responseText).errors[0]));
      dispatch(error_upload_product());
    }.bind(this));
  }
}

export function DidUploadProduct( ){
  return {
    type : Did_Upload_Product
  }
}

export function error_upload_product(){
  return {
    type : ERROR_UPLOAD_PRODUCT
  }
}

//handle product detail
export function clickedProductID(clickedProductID){
  return {
    type : Clicked_Product_ID,
    clickedProductID : clickedProductID
  }
}

//get category product


export function will_request_category_product() {
  return {
    type: will_request_category_product
  }
}

export function request_category_product(category_name) {
  return function (dispatch) {
    dispatch(requestProducts())
      axios.get(serverAddress+'api/v1/category', {
          params: {
            category: category_name
          }
        })
        .then((response)=>{
          //console.log(response,"@@@@@@@@@@####");
          dispatch(receiveProducts(response.data.data.products));
        })
  }
}


export function did_request_category_product(products) {
  return {
    type: DID_REQUEST_CATEGORY_PRODUCT,
    products
  }
}

//ADD TO SHOPPING Cart
export function add_to_shopping_cart(product_id) {
  return function (dispatch) {
      axios.post(serverAddress+'api/v1/add_to_cart', {
          product_id: product_id,
        },{
          headers: {"Authorization" : "Bearer " +  sessionStorage.getItem('token')},
        })
        .then((response)=>{
          dispatch(show_alert_message('success', 'Congrats! You have sucessfully add this item to your shopping cart.'))
        })
  }
}

//get buying product
export function will_get_buying_product(){
  return {
    type:WILL_GET_BUYING_PRODUCT
  }
}

export function get_buying_product(){
  return function(dispatch){
    dispatch(will_get_buying_product());
    axios.get(serverAddress+'api/v1/profile/buy', {
        headers: {"Authorization" : "Bearer " +  sessionStorage.getItem('token')},
      })
      .then((response)=>{
        dispatch(did_get_buying_product(response.data.data.shopping_cart));
      })
    //thun over here;
  }
}

export function did_get_buying_product(products){
  return {
    type:DID_GET_BUYING_PRODUCT,
    products
  }
}


//get selling product
export function will_get_selling_product(){
  return {
    type:WILL_GET_SELLING_PRODUCT
  }
}

export function get_selling_product(){
  return function(dispatch){
    dispatch(will_get_selling_product());
    //thun over here;
    axios.get(serverAddress+'api/v1/profile/sell', {
        headers: {"Authorization" : "Bearer " +  sessionStorage.getItem('token')},
      })
      .then((response)=>{
        dispatch(did_get_selling_product(response.data.data.store));
      })

  }
}

export function did_get_selling_product(products){
  return {
    type:DID_GET_SELLING_PRODUCT,
    products
  }
}

//get profile stats
export function will_get_profile_stats (){
  return {
    type : WILL_GET_PROFILE_STATS
  }
}

export function get_profile_stats(){
  return function (dispatch){
    dispatch(will_get_profile_stats())
    axios.get(serverAddress+'api/v1/profile', {
        headers: {"Authorization" : "Bearer " +  sessionStorage.getItem('token')},
      })
      .then((response)=>{
        dispatch(did_get_profile_stats(response.data.data.user));
      })
  }
}

export function did_get_profile_stats(profile_stats){
  return {
    type : DID_GET_PROFILE_STATS,
    profile_stats
  }
}
