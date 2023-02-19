import React from 'react'

const Message = ({text, user, uri}) => {
    const style_end = {
        'align-self':'flex-end',
        'justify-content': 'right'
      };

    const my_chat_color={'background-color': 'blueviolet', color:'white', 'border-radius': '25px 10px 0px 25px'}
    const others_chat_color={'background-color': 'rgb(229, 207, 249)', 'border-radius': '10px 20px 20px 0px'}
    const style_start = {
        'align-self':'flex-start',
        'justify-content': 'left'
      };

  return (
    <div className="message_item_container" style={user==='me'?style_end:style_start}>
    {user==='other' && <img className="user_icon" src={uri}/>}
    <div className="chat" style={user==='me'?my_chat_color:others_chat_color}>{text}</div>
    {user==='me' && <img className="user_icon" src={uri}/>}
    </div> 
  )
}

export default Message
