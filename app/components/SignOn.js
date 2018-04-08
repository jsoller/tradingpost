// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class SignOn extends Component {
   state = {
      username: '',
      password: ''
   };
   handleUsername = (text) ⇒ {
      this.setState({ username: text })
   }
   handlePassword = (text) ⇒ {
      this.setState({ password: text })
   }
   login = (username, pass) ⇒ {
      alert('username: ' + username + ' password: ' + pass)
   }
   render(){
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "username"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleUsername}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
               
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () ⇒ this.login(this.state.username, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}

export default SignOn;