import React from 'react';
import { Text, View ,FlatList, SearchBar} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import db from '../config';

export default class Readscreen extends React.Component {
  constructor(){
    super();
    this.state={
      stories:[],
      lastDocument:null,
      search:""
    }
  }

  componentDidMount= async()=>{
    const Story = await db.collection("Stories").limit(10).get();
    Story.docs.map((doc)=>{
       this.setState({
         stories:[...this.state.stories,doc.data()],
         lastDocument:doc
       })

    })

  }

  collectData = async()=>{
    const Stories = await db.collection("Stories").startAfter(this.state.lastDocument)
    .limit(10).get();
    Stories.docs.map((doc)=>{
      this.setState({
        stories:[...this.state.stories,doc.data()],
        lastDocument:doc
      })
    })
  }

  searchData = async()=>{
    const searchStories = await db.collection("Stories").where("Title", "==", this.state.search).get()
    
    searchStories.docs.map((doc)=>{
      this.setState({
        stories:[doc.data()],
        })
    })
  }
  
  updateSearch = (search) => {
    this.setState({ search });
  };

    render() {
      const { search } = this.state;
      return (
        <View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Search</Text >
        </View>
        <View>
        <SearchBar
        placeholder="Search..."
        onChangeText={this.updateSearch}
        value={search}
      /></View>
        <FlatList data = {this.state.Alltransactions} 
        renderItem={({item})=>{
        <View style={{borderWidth:3}} >
              <Text>{"Title:" + item.Title}</Text>
              <Text>{"Author:" + item.AuthorName}</Text>
              <TouchableOpacity>
                <Text>Read</Text>
              </TouchableOpacity>
        </View>
        }
      } 
      keyExtractor={(item,index)=>{
        index.toString();
      }} 
      onEndReached={this.collectData}
      onEndReachedThreshold={0.8}
      />
          
          
        
        </View>
      );
    }
  }     