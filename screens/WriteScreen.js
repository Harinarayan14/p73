import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,KeyboardAvoidingView,ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Header} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'
export default class WriteScreen extends React.Component {
    constructor(){
        super();
        this.state={
          AuthorName:  "",
          Title :"",
          Story:""
        }
      }

      submitStory=async()=>{
        db.collection("Stories").doc(this.state.Title).update({
            Title:this.state.Title,
            Story:this.state.Story,
            AuthorName:this.state.AuthorName
        })
        return(
      ToastAndroid.show("Successfully Submitted",ToastAndroid.SHORT))}


    render(){
        return(
          <View>
            <Header
          backgroundColor={'#DF3A01'}
          centerComponent={{
            text: 'Write Stories',
            style: {
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 'bold',
            },
          }}
      />
            <View style={styles.container}>
              
                <View style={styles.inputView}>
                <KeyboardAvoidingView behaviour="padding" enabled>     
            <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({ AuthorName: text });
            }}
            placeholder="Author Name"
            value={this.state.AuthorName}
            /></KeyboardAvoidingView></View>
            <View style={styles.inputView}>
              <KeyboardAvoidingView behaviour="padding" enabled>
            <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({ Title: text });
            }}
            placeholder="Title"
            value={this.state.Title}
            /></KeyboardAvoidingView>
            </View>
            <View style={styles.inputView}>
            <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({ Story: text });
            }}
            placeholder="Story"
            value={this.state.Story}
            
            />
            </View><View style={styles.inputView}>
            <TouchableOpacity style={styles.submitButton} 
            onPress={async ()=>{
             await this.submitStory();

            }}>
              <Text style={styles.buttonText}>
                Submit
              </Text>
            </TouchableOpacity>
            </View>

            </View>
            </View>
            
        )}
    
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    displaytext:{
      fontSize:15,
      textDecorationLine:'underline'
    },
    head:{
      fontSize:25,
      textAlign:'center',
      borderStyle:'solid',
      backgroundColor:'#222831'
    },
    submitButton:{
      backgroundColor:'green',
      padding:10,
      margin:10
    },
    buttonText:{
      fontSize:15,
      textAlign:'center',
      marginTop:10
    },
    inputView:{
      flexDirection:'row',
      margin:20
    },
    inputBox:{
      width:200,
      height:40,
      fontSize:20
    },
    storyBox:{
      width:200,
      height:500,
      borderWidth:1.5,
      borderRightWidth:0,
      fontSize:15
    },
  }
  )
