class ChatAppConfig{

  uid = '';
  messagesRef = null;
  configArr = null;
  constructor() {
    this.configArr = {
      placeholder:'Bir mesaj yazın',
      errorMessage:'Bir hata oluştu',
      dateFormat:'DD/MM/YYYY',
      timeFormat:'HH:mm',
      loadEarlierText: 'Önceki Mesajları Yükle',
      locale:'tr',
      defaultAvatar:'https://image.flaticon.com/icons/png/512/149/149072.png',
      firebaseConfig:{
        apiKey: 'AIzaSyAkUrdoOP43Da5eKGGQT5r7joAQE1Fd0lA',
        authDomain: 'testchat-2db59.firebaseapp.com',
        databaseURL: 'https://testchat-2db59.firebaseio.com/',
        storageBucket: 'testchat-2db59.appspot.com',
      }
    }
  }
  getPlaceHolderText(){
    return this.configArr.placeholder;
  }

  getFirebaseConfig(){
    return this.configArr.firebaseConfig;
  }

  getErrorMessage(){
    return this.configArr.errorMessage;
  }
  getDefaultAvatarUrl(){
    return this.configArr.defaultAvatar;
  }

  getDateFormat(){
    return this.configArr.dateFormat
  }
  getTimeFormat(){
    return this.configArr.timeFormat;
  }
  getLocale(){
    return this.configArr.locale;
  }

  getLoadEarlierText(){
    return this.configArr.loadEarlierText;
  }
}
export default new ChatAppConfig();
