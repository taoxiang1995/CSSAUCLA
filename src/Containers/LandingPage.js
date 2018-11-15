//@flow
import React, { Component } from "react";
import { Router, Route, Link, browserHistory } from "react-router";
import { connect } from "react-redux";

import Alert from "../Components/Alert";
import Header from "../Components/header";
import FilterBar from "../Components/FilterBar";
import Modal from "../Components/Modal";
import CardsContainer from "../Components/CardsContainer";
import Banner from "../Components/Banner";
import { post_phone_number } from "../Actions/UserAction";
import {
  fetchProducts,
  filterProducts,
  clickedProductID
} from "../Actions/productsAction";
import { close_alert } from "../Actions/AlertAction";
import { logOut } from "../Actions/UserAction";
import SearchBar from "../Components/SearchBar";
import UploadProduct from "./uploadProduct";
import ProductDetail from "../Components/ProductDetail";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import SignUpModal from "../Components/Auth/SignUpForm";
import SignInModal from "../Components/Auth/SignInForm";
import ProductDetailContainer from "./ProductDetailContainer";
import Profile from "../Components/Profile";
import "../css/landingPage.css";

/*
  is_signed_in : bool
*/

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shrinkBanner: false,
      shrinked: false,
      showUploadProductModal: false,
      showSignUpModal: false,
      showSignInModal: false,
      showDetailModal: false,
      showProfile: false,
      currentFilterId: 0
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
    window.addEventListener("scroll", this.shrinkBanner.bind(this));
  }

  handleAddProductClick() {
    // browserHistory.push('/uploadproduct');

    if (this.props.user.is_signed_in) {
      this.setState({
        showUploadProductModal: true
      });
    } else {
      this.setState({
        showSignUpModal: true
      });
    }
  }

  shrinkBanner() {
    var currentHeight = window.pageYOffset;
    //if scroll down
    if (currentHeight >= 0) {
      this.setState({
        shrinkBanner: true
      });
      //collapse banner by adding a css class "collapse" to minimize the height
      !this.state.shrinked &&
        document.getElementsByClassName("title")[0] &&
        (document.getElementsByClassName("title")[0].className += " collapse");
      //collapse banner by adding a css class "collapse" to minimize the height
      !this.state.shrinked &&
        document.getElementsByClassName("profile-container")[0] &&
        (document.getElementsByClassName("profile-container")[0].className +=
          " moveDown");
      //set the flag shrinked to indicate the banner is shrinked.
      this.setState({
        shrinked: true
      });
    }
    //if scroll back to the top
    if (currentHeight == 0) {
      this.setState({
        shrinkBanner: false,
        shrinked: false
      });

      //expand the banner by remove the "collapse" class
      document.getElementsByClassName("title")[0] &&
        document
          .getElementsByClassName("title")[0]
          .classList.remove("collapse");
      document.getElementsByClassName("profile-container")[0] &&
        document
          .getElementsByClassName("profile-container")[0]
          .classList.remove("moveDown");
    }

    this.handleReachTheBottomOfPage();
  }

  setCurrentFilterID(currentFilterId) {
    this.setState({
      currentFilterId
    });
  }

  handleReachTheBottomOfPage() {
    //load next 20 produxts only if we are in the landing page
    //and in the featured category.
    if (!this.state.showProfile && this.state.currentFilterId == 0) {
      var scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      var scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      if (scrollTop + window.innerHeight == scrollHeight) {
        this.props.dispatch(fetchProducts());
      }
    }
  }

  handleProductModalClose() {
    this.setState({
      showUploadProductModal: false
    });
  }

  onModalClose() {
    this.setState({
      showSignUpModal: false,
      showSignInModal: false
    });
  }

  onSignUpClick() {
    this.setState({
      showSignUpModal: true
    });
  }

  onSucessSignUp() {
    this.setState({
      showSignUpModal: false
    });
  }

  onSignInClick() {
    this.setState({
      showSignInModal: true
    });
  }

  onSucessSignIn() {
    this.setState({
      showSignInModal: false
    });
  }

  handleProductCardClick() {
    this.setState({
      showDetailModal: true
    });
  }

  handleProductDetailClose() {
    this.setState({
      showDetailModal: false
    });
  }

  handleProfileButtonClick() {
    this.setState({
      showProfile: true
    });
  }

  handleProfileButtonGoBackClick() {
    this.setState({
      showProfile: false
    });
    this.props.dispatch(fetchProducts());
  }

  renderProfile() {
    if (this.state.showProfile) {
      return <Profile />;
    } else {
      return <div />;
    }
  }

  handleCloseIconClick() {
    this.props.dispatch(close_alert());
  }

  render() {
    return (
      <div>
        <Alert
          postPhoneNumber={this.props.postPhoneNumber}
          type={this.props.alert.messageType}
          content={this.props.alert.messageContent}
          shouldOpen={this.props.alert.shouldShowAlert}
          handleCloseIconClick={this.handleCloseIconClick.bind(this)}
        />
        <ProductDetailContainer
          handleProductDetailClose={this.handleProductDetailClose.bind(this)}
          showDetailModal={this.state.showDetailModal}
        />
        <SignUpModal
          onSucessSignUp={this.onSucessSignUp.bind(this)}
          onModalClose={this.onModalClose.bind(this)}
          showModal={this.state.showSignUpModal}
          className=""
        />
        <SignInModal
          onSucessSignIn={this.onSucessSignIn.bind(this)}
          onModalClose={this.onModalClose.bind(this)}
          showModal={this.state.showSignInModal}
          className="signInModal"
        />
        {this.state.showUploadProductModal ? (
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            <UploadProduct
              handleProductModalClose={this.handleProductModalClose.bind(this)}
            />
          </ReactCSSTransitionGroup>
        ) : (
          ""
        )}
        <div
          className={
            "headerAndProduct " +
            (this.state.showUploadProductModal || this.state.showDetailModal
              ? "headerAndProductBlur"
              : " ")
          }
        >
          <div className={this.state.shrinkBanner ? "fixed" : ""}>
            <Banner
              handleProfileButtonGoBackClick={this.handleProfileButtonGoBackClick.bind(
                this
              )}
              showProfile={this.state.showProfile}
              handleProfileButtonClick={this.handleProfileButtonClick.bind(
                this
              )}
              onLogOutClick={this.props.signOut}
              is_signed_in={this.props.user.is_signed_in}
              onSignUpClick={this.onSignUpClick.bind(this)}
              titleName={
                this.state.showProfile ? "My Stuff" : "UCLA Marketplace"
              }
              onSignInClick={this.onSignInClick.bind(this)}
              className={
                this.state.shrinkBanner || this.state.showProfile
                  ? "shrink"
                  : ""
              }
              onSearchTermInput={this.props.onSearchTermInput}
            />

            {this.state.showProfile ? (
              <div />
            ) : (
              <FilterBar
                setCurrentFilterID={this.setCurrentFilterID.bind(this)}
              />
            )}
          </div>

          {this.renderProfile()}

          <CardsContainer
            getClickedProductID={this.props.getClickedProductID}
            handleProductCardClick={this.handleProductCardClick.bind(this)}
            className={this.state.shrinkBanner ? "moveDown" : ""}
            products={this.props.products}
          />
          <button
            onClick={this.handleAddProductClick.bind(this)}
            className="addProduct"
          >
            <i className="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.Products.products,
    user: state.Users,
    alert: state.Alert
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchTermInput: searchTerm => {
      dispatch(filterProducts(searchTerm));
    },
    signOut: () => {
      dispatch(logOut());
    },
    getClickedProductID: ProductID => {
      dispatch(clickedProductID(ProductID));
    },
    postPhoneNumber: phoneNumber => {
      dispatch(post_phone_number(phoneNumber));
    },
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
