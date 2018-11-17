import React, { Component } from 'react';
import '../css/Banner.css';
import { Router, Route, Link, browserHistory } from 'react-router'
import Button from './Button';
import SearchIcon from './SearchIcon';



class Banner extends Component {
  constructor (props)
  {
    super(props);
    this.state = {
      searchTerm : '',
    }
  }

  handleSignUpClick(){
    browserHistory.push('/signup');
  }

  handleInputChange(e){
    this.setState({
      searchTerm : e.target.value
    })
    this.props.onSearchTermInput(e.target.value);
  }

  handleLogout(){
    this.props.handleProfileButtonGoBackClick();
    this.props.onLogOutClick();
  }

  renderButtonGroup(){
    if (! this.props.is_signed_in)
    {
      return (
        <div className="buttonGroup">
          <Button handleButtonClick = {this.props.onSignUpClick} className="signinButton" buttonName="Sign Up" />
          <Button handleButtonClick = {this.props.onSignInClick} className="signinButton" buttonName="Sign in"/>
        </div>
      )
    }

    else
    {
      return (
        <div className="buttonGroup">
          <Button handleButtonClick={this.props.handleProfileButtonClick} className="signinButton" buttonName="Profile"/>
          <Button handleButtonClick={this.handleLogout.bind(this)}  className="signinButton" buttonName="Log Out"/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className={this.props.className+ " bannerContainer " }>
        <div className="buttons">
          {this.props.showProfile? <div><i onClick={this.props.handleProfileButtonGoBackClick} className="fa fa-arrow-circle-o-left fa-3x profile-goback" aria-hidden="true"></i></div> : <SearchIcon searchTerm={this.state.searchTerm} handleInputChange={this.handleInputChange.bind(this)} />}
          {this.renderButtonGroup()}
        </div>

        <div className="title">
          {this.props.titleName}
        </div>
      </div>
    );
  }
}

export default Banner;
