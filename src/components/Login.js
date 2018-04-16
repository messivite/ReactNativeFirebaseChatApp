import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FBSDK, { LoginManager ,AccessToken} from 'react-native-fbsdk';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import ChatAppConfig from '../config/config';


//const firebaseRef = firebase.initializeApp( ChatAppConfig.getFirebaseConfig() );

export default class Login extends React.Component{

  state = {
  chatName: '',
  };


    _fbAuth(){

      LoginManager.logInWithReadPermissions(['public_profile','email']).then(
        function(result){
          if(result.isCancelled){
            alert('Login isCancelled');
          }else{
            AccessToken.getCurrentAccessToken().then((
              accessTokenData) => {
                const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken )


                firebase.auth().signInWithCredential(credential).then(
                  (result) => {

                    Actions.chat({
                      chatName: result.providerData[0].displayName,
                      profileImage:result.providerData[0].photoURL
                    });

                    console.log(result);
                  },(error) => {
                      console.log(error);
                  })

              },(error => {
                console.log('some error occured' + error);
              }))
            //alert('Login successfully with permissions: ' +result.grantedPermissions.toString());
          }
        },
        function(error){
          alert('Login with error' + error)
        }

      );
    }
    render() {
      return(
        <View style={styles.container}>


              <View style={ styles.content} >


  <Button

  style={styles.buttonLogin}
  onPress={ this._fbAuth }
  title="Facebook Login"
  color="#841584"
/>

</View>
             </View>
      );
    }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  },
  content:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
  },
  textInput: {
    height: 40,
    marginLeft: 15,
  },
  buttonLogin:{
    fontSize:22
  }
});
