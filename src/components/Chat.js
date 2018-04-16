import React from 'react';

import{
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {GiftedChat,Send,Color,LoadEarlier} from 'react-native-gifted-chat';
import Backend from '../Backend';
import ChatAppConfig from '../config/config';

export default class Chat extends React.Component{

constructor(props){
  super(props);
  LoadEarlier.defaultProps.label = ChatAppConfig.getLoadEarlierText();

Actions.refresh({title: this.props.chatName ? this.props.chatName: 'Chat' })
  this.state = {
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
    profileImage:this.props.profileImage ? this.props.profileImage : ChatAppConfig.getDefaultAvatarUrl()
  };
   this._isMounted = false;
   this.onLoadEarlier = this.onLoadEarlier.bind(this);

}
componentWillMount() {
  this._isMounted = true;
  Backend.loadMessages((message) => {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, message),
          };
        });
     });
 }

 componentDidMount() {


  }
  componentWillUnmount() {
    Backend.closeChat();
    this._isMounted = false;
  }
  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });
if (this._isMounted === true) {

  Backend.loadMessages((message) => {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, message),
          };
        });
     });
    }

  }

 renderSend(props) {
         return (
             <Send
                 {...props}
             >
                 <View style={styles.sendBtnContanier}>
                   <Text style={ styles.sendBtn }>Gönder</Text>
                 </View>
             </Send>
         );
  }
    render() {
      return(
        <GiftedChat
         messages={this.state.messages}
         showUserAvatar={true}
         showAvatarForEveryMessage={false}
         locale={ChatAppConfig.getLocale()}
         dateFormat={ ChatAppConfig.getDateFormat() }
         timeFormat={ ChatAppConfig.getTimeFormat() }
         placeholder={ChatAppConfig.getPlaceHolderText()}
         renderSend={this.renderSend}
         loadEarlier={this.state.loadEarlier}
         onLoadEarlier={this.onLoadEarlier}
         isLoadingEarlier={this.state.isLoadingEarlier}
         onSend={(message) => {
           Backend.sendMessage(message);
         }}
         user={{
           _id: Backend.getUid(),
           name: this.props.chatName,
           avatar:this.props.profileImage
         }}
       />
      );
    }

}
Chat.defaultProps = {
  name: 'John Smith',
};

const styles = StyleSheet.create({
  sendBtnContanier: {
    marginRight: 10,
    marginBottom: 13
  },
  sendBtn:{
    color:'#0084ff',
    fontWeight:'bold',
    fontSize:16
  }
});
