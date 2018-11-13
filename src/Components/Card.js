import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import '../css/Card.css';



class Card extends Component {
  constructor (props)
  {
    super(props);
  }

  handleCardClick( ){
    this.props.getClickedProductID(this.props.productId);
    this.props.onClick();
  }


  render() {
    return (
        <div className="cardContainer" onClick={this.handleCardClick.bind(this)}>
          <img className="productImg" style={{flex:40, 'border-top-right-radius': '3%', 'border-top-left-radius': '3%', 'max-width':'100%', height:'auto'}} src={this.props.imgURL} />
          <div style={{'margin-top':'4%', flex:20, 'padding-bottom':'10px', display:'flex', 'flex-direction':'column', 'justify-content':'space-between'}} className="description">
            <div>
              <div className="priceAndView">
                <div className="price">${this.props.price}</div>
                <div>
                  <i className="fa fa-eye" aria-hidden="true"></i> 250
                </div>
              </div>
              <div className="productName">{this.props.productName}</div>
              <div className="productDescription">{this.props.description}</div>
            </div>
            <div className="sellerInfo">
              <div className="avatar">
                <img className="avatarImg" src="./avatar.png" />
              </div>
              <div className="info">
                <div className="sellerName">Joe Bruin</div>
                <div><i className="fa fa-map-marker" aria-hidden="true"></i> Los Angeles</div>
              </div>
            </div>

          </div>

          <div style={{flex:40}} className="detail">
            <div>{this.props.location}</div>

          </div>
        </div>
    );
  }
}

export default Card;
