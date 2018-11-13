import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../css/searchIcon.css';


/*
  props:
  function: handleInputChange
  searchTerm
*/
class SearchIcon extends Component {
  constructor (props)
  {
    super (props);
    this.state = {
      showSearchBar : false,
      showSearchIcon : true
    }
  }

  handleInputOnBlur(){
    this.setState({
      showSearchBar : false
    });

    window.setTimeout(function(){
      this.setState({
        showSearchIcon : true
      });
    }.bind(this), 500);
  }

  searchIconClick(){
    this.setState({
      showSearchBar : true,
      showSearchIcon : false
    })
  }


  renderSearchBar(){
    if (this.state.showSearchBar)
    {
      return (
          <input key="a" onBlur = {this.handleInputOnBlur.bind(this)} onChange={this.props.handleInputChange} className="search" placeholder="   Search" value={this.props.searchTerm}/>
      )
    }
  }

  renderSearchIcon(){
    if (this.state.showSearchIcon)
    {
      return (
        <button className="searchIconButton"><i key="b" onClick = {this.searchIconClick.bind(this)} className="fa fa-search fa-2x searchIcon" aria-hidden="true"></i></button>
      )
    }
  }


  render(){
    return (
      <div>
        {this.renderSearchIcon()}
        <ReactCSSTransitionGroup
          transitionName="searchIcon"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
          {this.renderSearchBar()}
        </ReactCSSTransitionGroup>
     </div>
    )
  }
}

export default SearchIcon;
