import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import db from '../config'

export default class ReadScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      stories:[],
      dataSource:[],
      search : ''
    }
  }
  componentDidMount(){
    this.fetchStories()
  }

  updateSearch = search => {
    this.setState({ search: search });
  };


  fetchStories=()=>{
    try {
      var stories= [];
     db.collection("Stories").get()
      .then((snapshot)=> {
          snapshot.forEach((doc)=> {           
              stories.push(doc.data())
          })
          this.setState({stories: stories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };


  search(text) {
    const newData = this.state.stories.filter((story)=> {

      const storyData = story.Title ? story.Title.toUpperCase() 
      : ''.toUpperCase();
      const textData = text.toUpperCase();
      return storyData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

    render(){
      return(
        <View>
           <Header
              backgroundColor={'#DF3A01'}
              centerComponent={{
                text: 'Read Stories',
                style: {
                  color: '#FFFFFF',
                  fontSize: 30,
                  fontWeight: 'bold',
                },
              }}
          />
          <View styles ={{height:20,width:'100%'}}>
              <SearchBar
                  placeholder="Search"
                  onChangeText={text => this.search(text)}
                  onClear={text => this.search('')}
                  value={this.state.search}
            />
          </View>
          
          <ScrollView>
            {this.state.search==="" ? 
            this.state.stories.map((story)=>{
              return (
                <View style={styles.storyContainer}>
                  <Text style={{fontSize: 20,color:"blue"}}>  TITLE:  {story.Title}</Text>
                  <Text style={{fontSize: 20,color:"blue"}}>  AUTHOR :  {story.AuthorName}</Text>
                </View>
              )
            }):
            this.state.dataSource.map((story)=>{
              return (
                <View style={styles.storyContainer}>
                  <Text style={{fontSize: 20,color:"blue"}}>  TITLE:  {story.Title}</Text>
                  <Text style={{fontSize: 20,color:"blue"}}>  AUTHOR :  {story.AuthorName}</Text>
                </View>
              )
            })}
            </ScrollView> 
          
          
          
        </View>  
      );      
    }
}


const styles = StyleSheet.create({
  storyContainer: {
    height: 120,
    width:'100%',
    borderWidth: 2,
    backgroundColor: "yellow",
    borderColor: 'green',
    justifyContent:'center',
    alignSelf: 'center',
    color:"white"
  },
  readButton:{
    backgroundColor:'green',
    padding:10,
    margin:10,
    width:125,
    height:50,
    alignContent:"center"
  }
});
