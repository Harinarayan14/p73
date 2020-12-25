import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView,Modal} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import db from '../config'

export default class ReadScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      stories:[],
      dataSource:[],
      search : '',
      isModalVisible:false,
      title:"",
      author:"",
      story:""
    }
  }
  componentDidMount(){
    this.fetchStories()
  }

  updateSearch = search => {
    this.setState({ search: search });
  };
  showStories=()=>{
    <Modal 
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
      <View>
        <Text style={{
          alignContent:"center",alignSelf:"center",fontSize:20,textDecorationStyle:"solid"
          }}>{this.state.title}</Text>
        <Text style={{
          alignContent:"center",alignSelf:"flex-end",fontSize:15
          }}>{"By "+this.state.author}</Text>
        <Text style={{
          alignContent:"center",alignSelf:"center",fontSize:12,fontFamily:"monospace"
          }}>{this.state.story}</Text>
      </View>
      <TouchableOpacity style={styles.readButton}>
        <Text style={{
          alignContent:"center",alignSelf:"center",fontSize:15
          }}
          onPress={()=>this.setState({"isModalVisible":false})}
          >Back</Text>
      </TouchableOpacity>
    </Modal>
  }

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
                  <TouchableOpacity style={styles.readButton}
                  onPress={
                    this.setState({
                      title:story.Title,
                      author:story.AuthorName,
                      story:story.Story
                    })
                  }> 
                    <Text style={{fontSize: 20,color:"red"}}>Read</Text>
                  </TouchableOpacity>
                </View>
              )
            }):
            this.state.dataSource.map((story)=>{
              return (
                <View style={styles.storyContainer}>
                  <Text style={{fontSize: 20,color:"blue"}}>  TITLE:  {story.Title}</Text>
                  <Text style={{fontSize: 20,color:"blue"}}>  AUTHOR :  {story.AuthorName}</Text>
                  <TouchableOpacity style={styles.readButton}
                  onPress={
                    this.setState({
                      title:story.Title,
                      author:story.AuthorName,
                      story:story.Story
                    })
                  }> 
                    <Text style={{fontSize: 20,color:"red"}}>Read</Text>
                  </TouchableOpacity>

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
