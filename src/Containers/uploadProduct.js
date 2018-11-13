import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import Banner from '../Components/Banner';
import FilterBar from '../Components/FilterBar';
import Dropzone from 'react-dropzone';
// import {base64} from 'base-64';
var base64 = require('base-64');
import '../css/uploadProduct.css';
import '../css/font-awesome/css/font-awesome.css';
import {serverAddress} from '../config';
import { connect } from 'react-redux';
import {uploadProduct} from '../Actions/productsAction';

class UploadProduct extends Component {
  constructor (props)
  {
    super(props);
    this.state = {
      Product : {},
    };
  }

  componentWillUnmount() {
    window.setTimeout(function(){
      document.getElementsByClassName('postProduct')[0].classList.add('fadeOut');
    }, 100)
    document.getElementsByClassName('postProduct')[0].classList.add('fadeOut');
  }


  handleNameInputChange(ev)
  {
    console.log(ev.target.value);
    this.setState({
      Product : Object.assign({}, this.state.Product, {name : ev.target.value})
    })
  }

  handleDescriptionInputChange(ev)
  {
    this.setState({
      Product : Object.assign({}, this.state.Product, {description : ev.target.value})
    })
  }

  handleCategoryInputChange(ev)
  {
    this.setState({
      Product : Object.assign({}, this.state.Product, {category : ev.target.value})
    })
  }


  handlePriceInputChange(ev)
  {
    this.setState({
      Product : Object.assign({}, this.state.Product, {price : ev.target.value})
    })
  }

  onDrop (files) {
    this.setState({
      Product : Object.assign({}, this.state.Product, {image : files} )
    })
  }

  getBase64Image(imgElem) {
  // imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
    var canvas = document.createElement("canvas");
    canvas.width = imgElem.naturalWidth;
    canvas.height = imgElem.naturalHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElem, 0, 0);
    var dataURL = canvas.toDataURL("image/png", 0.5);
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  getStringOfBase64Image(){
    return JSON.stringify(this.getBase64Image(document.getElementById('uploadedImg')));
  }

  renderImgPreview(){
    if (this.state.Product.image == null)
    {
      return (
        <i className="fa fa-plus fa-3x plusIcon" aria-hidden="true"></i>
      )
    }
    else
    {
      return (
        <img id="uploadedImg" style={{width:"100px", height:"100px", "border-radius":"5px"}} src={this.state.Product.image[0].preview} />
      )
    }
  }

  onProductSubmit(){
    this.props.dispatch(uploadProduct(this.state.Product, serverAddress, this.getStringOfBase64Image(), this.props.handleProductModalClose) );
  }

  render() {
    return (
        <div className="postProduct">
          <div className="productInfo">

            <div className="productPhotos">
              <div className="header">
                <div className="headerText"><h4>Item Photos.</h4></div>
                <i className="fa fa-times fa-lg closeIcon" aria-hidden="true" onClick={this.props.handleProductModalClose}></i>
              </div>
              <div className="photos">
                <Dropzone className="addPhoto" onDrop={this.onDrop.bind(this)}>
                    {this.renderImgPreview()}
                </Dropzone>
              </div>
            </div>

            <div className="inputs">

              <input
                className="input"
                type='string'
                name='name'
                placeholder='Write the name of your listing'
                value = {this.state.Product.name}
                onChange = {this.handleNameInputChange.bind(this)}
               />
              <input
               className="input"
               type='string'
               name='description'
               placeholder='Type a description of your product'
               value = {this.state.Product.description}
               onChange = {this.handleDescriptionInputChange.bind(this)}
              />

              <select
                className="input uploadCategorySelector"
                type='string'
                name='category'
                value = {this.state.Product.category}
                onChange = {this.handleCategoryInputChange.bind(this)}>
                <option value="" disabled selected>Choose a category of your product</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Clothes">Clothes</option>
                <option value="Others">Others</option>
              </select>
              
              <input
                className="input"
                type='number'
                name='price'
                placeholder='Price'
                value={this.state.Product.price}
                onChange = {this.handlePriceInputChange.bind(this)}
               />
            </div>

            <div className="postButton" onClick={this.onProductSubmit.bind(this)}>
              Post !
              {this.props.isUploading? <i className="fa fa-spinner spinning" aria-hidden="true"></i> : "" }
            </div>
        </div>
        </div>
    );
  }
}

function mapStateToProps(state) {

   return {
     isUploading  : state.Products.isUploading
   }
}




export default connect(mapStateToProps)(UploadProduct);
