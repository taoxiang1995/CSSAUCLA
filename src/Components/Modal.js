import React, {Component} from 'react';
import "../css/Modal.css";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Modal extends Component{
  constructor(props){
    super (props);
  }

  renderModal(){
    if (this.props.showModal)
    {
      return (
        <div className="modal-body modal-background ">
          <div className={"modal-container "+this.props.className}>
            <i onClick={this.props.onModalClose} className="fa fa-times fa-2x modal-closeIcon" aria-hidden="true"></i>
            {this.props.children}
          </div>
        </div>
      )
    }
    else
    {
        return(
          <div>
          </div>
        )
    }
  }


  render(){
    return(
      this.renderModal()
    )
  }
}

export default Modal;
