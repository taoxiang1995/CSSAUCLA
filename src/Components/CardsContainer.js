import React, { Component } from "react";
import { Router, Route, Link, browserHistory } from "react-router";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Masonry from "react-masonry-component";
import Card from "./Card";
import "../css/CardsContainer.css";
import LazyLoad from "react-lazyload";

var masonryOptions = {
  transitionDuration: 0,
  gutter: 45
};

class CardsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {
    // console.log(document.querySelector("span"));
    //console.log(document.getElementById("suck"));
  }

  renderCards() {
    if (this.props.products) {
      return this.props.products.map(
        function(product, index) {
          return (
            <ReactCSSTransitionGroup
              className="cards"
              transitionName="card"
              transitionAppear={true}
              transitionAppearTimeout={1500}
              transitionLeaveTimeout={1000}
            >
              <LazyLoad height={80} true>
                <Card
                  getClickedProductID={this.props.getClickedProductID}
                  onClick={this.props.handleProductCardClick}
                  key={index}
                  price={product.price}
                  productName={product.name}
                  description={product.description}
                  imgURL={product.image_url}
                  productId={product.id}
                />
              </LazyLoad>
            </ReactCSSTransitionGroup>
          );
        }.bind(this)
      );
    }
  }

  render() {
    var masonryOptions = {
      gutter: 10
    };

    return (
      <Masonry
        className={"my-gallery-class cardsContainer " + this.props.className}
        id="suck"
        elementType={"ul"}
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        {this.renderCards()}
      </Masonry>
    );
  }
}

export default CardsContainer;
