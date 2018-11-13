import React, {Component} from 'react';
import '../css/ProductDetail.css';
import Modal from  './Modal';

class ProductDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  addToShoppingCart(){
    //alert(this.props.selectedProduct.id);
    this.props.addToShoppingCart(this.props.selectedProduct.id);
  }

  render(){
    return(
      <Modal onModalClose={this.props.handleProductDetailClose} showModal={this.props.showDetailModal} className="Product-outer-modal">
        <div className="product-modal-container">

          <div className="product-close">
          </div>

          <div className="product-profile">
            <div className="product-profile-picture">
              <img src={this.props.selectedProduct&&this.props.selectedProduct.image_url}/>
            </div>
            <div className="product-profile-user">
              <div className="product-profile-user-avatar">
                  <img className="product-profile-user-avatar-img" src="./avatar.png" />
              </div>
              <div className="product-profile-user-desciption">
                <p>Posted by</p>
                <p>Tao Xiang</p>
              </div>
            </div>
          </div>

          <div className="product-description">
            <div className="product-description-title">
              <p className="product-description-title-name">{this.props.selectedProduct&&this.props.selectedProduct.name}</p>
              <p className="product-description-title-price">${this.props.selectedProduct&&this.props.selectedProduct.price}</p>
            </div>

            <div className="product-description-detail">
              <p>{this.props.selectedProduct&&this.props.selectedProduct.description}</p>
            </div>

            <div className="product-description-buttons">
              <button className="product-description-buttons-contact">Contact</button>
              <button onClick={this.addToShoppingCart.bind(this)} className="product-description-buttons-add">Add to Cart</button>
            </div>
          </div>

        </div>
      </Modal>
    )
  }


}

export default ProductDetail;
