import React, { Component } from "react";
import "../css/ProductDetail.css";
import Modal from "./Modal";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addToShoppingCart() {
    //alert(this.props.selectedProduct.id);
    this.props.addToShoppingCart(this.props.selectedProduct.id);
  }

  render() {
    return (
      <Modal
        onModalClose={this.props.handleProductDetailClose}
        showModal={this.props.showDetailModal}
        className="Product-outer-modal"
      >
        <div className="product-modal-container">
          <div className="product-close" />

          <div className="product-profile">
            <div className="product-profile-picture">
              <img
                src={
                  this.props.selectedProduct &&
                  this.props.selectedProduct.image_url
                }
              />
            </div>
          </div>

          <div className="product-description">
            <div className="product-description-title">
              <p className="product-description-title-name">
                {this.props.selectedProduct && this.props.selectedProduct.name}
              </p>
            </div>

            <div className="product-description-detail">
              <p style={{ color: "black" }}>食材</p>
              <p>
                {this.props.selectedProduct &&
                  this.props.selectedProduct.description}
              </p>
              <p style={{ color: "black" }}>制作方法</p>
              <p className="product-description-title-price">
                {this.props.selectedProduct && this.props.selectedProduct.price}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProductDetail;
