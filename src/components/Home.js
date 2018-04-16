import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component{

  state = {
  chatName: '',
  };
    render() {
      return(
        <View style={styles.container}>
               <Text style={[styles.label, {marginTop: 40}]}>
                 Adınızı Girin:
               </Text>
               <TextInput
                 placeholder='Mustafa Aksoy'
                 style={styles.textInput}
                 onChangeText={(text) => {
                   this.setState({
                     chatName: text,
                   });
                 }}
                 value={this.state.chatName}
               />
               <TouchableOpacity
                 onPress={() => {

                   Actions.chat({
                     chatName: this.state.chatName,
                   });
                 }}
               >
                 <Text style={styles.label}>
                   Sonraki Sayfa
                 </Text>
               </TouchableOpacity>
             </View>
      );
    }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    marginLeft: 15,
  },
  textInput: {
    height: 40,
    marginLeft: 15,
  },
});
