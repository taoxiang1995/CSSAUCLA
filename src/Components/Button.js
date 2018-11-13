import React, {Component} from 'react';
import '../css/button.css';

class Button extends Component{
  constructor(props)
  {
    super (props);
  }


  render(){
    return(
      <button className={"Button "+this.props.className} onClick = {this.props.handleButtonClick}>
        {this.props.buttonName}
      </button>
    )
  }
}

export default Button;
