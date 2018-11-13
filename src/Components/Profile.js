import React, {Component} from 'react';
import {connect} from 'react-redux';

import {get_buying_product, get_selling_product, get_profile_stats} from '../Actions/productsAction';
import {show_alert_message, close_alert} from '../Actions/AlertAction';
import {post_phone_number} from '../Actions/UserAction';

import '../css/Profile.css';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeSectionId : 1
    }
  }

  componentWillMount() {
    this.props.dispatch(get_profile_stats());
    this.props.dispatch(get_buying_product());
  }

  activeSection(id){
    return this.state.activeSectionId == id? 'profile-userStats-section-active' : ''
  }

  handleSectionClick(id){
    switch (id) {
      //Buying
      case 1:
        this.props.dispatch(get_buying_product());
        break;
      //Selling
      case 2:
        this.props.dispatch(get_selling_product());
        break;
      default:

    }
    this.setState({
      activeSectionId : id
    })
  }

  handlePenClick(){
    this.props.dispatch(show_alert_message('warm', 'Congrats! You have sucessfully add this item to your shopping cart.'));
  }

  handleAlertClose(){
    this.props.dispatch(close_alert());
  }

  render(){
    return(
      <div className="profile-container">
        <div className="profile-userInfo">
          <div className="profile-userInfo-nameAndEmailAndIcon">
            <div className="profile-userInfo-nameAndEmailAndIcon-icons">
              <i onClick={this.handlePenClick.bind(this)} handleCloseIconClick={this.handleAlertClose} className="fa fa-pencil fa-2x" aria-hidden="true"></i>
              <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
              <i className="fa fa-ellipsis-h fa-2x" aria-hidden="true"></i>
            </div>
            <p className="profile-userInfo-nameAndEmailAndIcon-name">{sessionStorage.getItem('email').slice(0, sessionStorage.getItem('email').indexOf('@'))}</p>
            <p className="profile-userInfo-nameAndEmailAndIcon-email">{sessionStorage.getItem('email')}</p>
          </div>
          <div className="profile-userInfo-avatar">
            <img className="profile-userInfo-avatar-img" src="avatar.png"/>
          </div>
        </div>
        <div className="profile-userStats">
          <div onClick = {()=>{this.handleSectionClick(1)}}  className={"profile-userStats-section profile-userStats-buying "+this.activeSection(1)}>
            <p className="profile-userStats-number">{this.props.profile_stats ? this.props.profile_stats.shopping_cart_number : ''}</p>
            <p className="profile-userStats-description">Buying</p>
          </div>

          <div onClick = {()=>{this.handleSectionClick(2)}}  className={"profile-userStats-section profile-userStats-buying "+this.activeSection(2)}>
            <p className="profile-userStats-number">{this.props.profile_stats ? this.props.profile_stats.store_number : ''}</p>
            <p className="profile-userStats-description">Selling</p>
          </div>

          <div onClick = {()=>{this.handleSectionClick(3)}}  className={"profile-userStats-section profile-userStats-buying "+this.activeSection(3)}>
            <p className="profile-userStats-number">0</p>
            <p className="profile-userStats-description">Bought</p>
          </div>

          <div onClick = {()=>{this.handleSectionClick(4)}}  className={"profile-userStats-section profile-userStats-buying "+this.activeSection(4)}>
            <p className="profile-userStats-number">0</p>
            <p className="profile-userStats-description">Sold</p>
          </div>
        </div>

      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    profile_stats : state.Products.profile_stats
  }
}

export default connect(mapStateToProps, null) (Profile);
