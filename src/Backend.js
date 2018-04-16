import firebase from 'firebase';
import ChatAppConfig from './config/config';

class Backend{

  uid = '';
  messagesRef = null;
  limit: 15;
total_count: null; //counter
  // initialize Firebase Backend
  constructor() {
    firebase.initializeApp( ChatAppConfig.getFirebaseConfig() );
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch((error) => {
          alert(JSON.stringify( error + ChatAppConfig.getErrorMessage() ) );
        });
      }
    });
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();

  }

  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {


    const onReceive = (data) => {
      const message = data.val();
      const keys = Object.keys(message);
      console.log(keys.length);
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        sent: true,
        received:true,
        user: {
          _id: message.user._id,
          name: message.user.name,
          avatar:message.user.avatar
        },
      });
    };
    //this.messagesRef.endAt(1).limitToLast(5).on('child_added', onReceive);
    //this.messagesRef.orderByKey().limitToLast(15).on('child_added', onReceive);
    //this.messagesRef.orderByChild("createdAt").on('child_added', onReceive)
    this.messagesRef.limitToLast(10).on('child_added', onReceive);
  }

  loadOldMessages(callback){

    const onReceive2 = (data) => {
      const message = data.val();
      const test = Object.keys();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        sent: true,
        user: {
          _id: message.user._id,
          name: message.user.name,
          avatar:message.user.avatar
        },
      });
    };
    this.messagesRef.limitToFirst(10).on('child_added', onReceive2);
  }

  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        sent:true,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
