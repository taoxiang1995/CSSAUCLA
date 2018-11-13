export const SHOW_ALERT_MESSAGE = 'SHOW_ALERT_MESSAGE';
export const CLOSE_ALERT = 'CLOSE_ALERT';

export function show_alert_message(messageType, messageContent){
  return {
    type:SHOW_ALERT_MESSAGE,
    shouldShowAlert:true,
    messageType,
    messageContent
  }
}

export function close_alert(){
  return {
    type:CLOSE_ALERT
  }
}
