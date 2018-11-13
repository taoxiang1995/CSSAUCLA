import {SHOW_ALERT_MESSAGE, CLOSE_ALERT} from '../Actions/AlertAction';

export default function Alert (state={shouldShowAlert:false}, action){
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
      return Object.assign({}, state, {
        shouldShowAlert:true,
        messageType:action.messageType,
        messageContent:action.messageContent
      })
      break;
    case CLOSE_ALERT:
      return Object.assign({}, state, {
        shouldShowAlert:false
      })
    default:
      return state

  }
}
