import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Button, View, Text, ScrollView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { SearchBar } from 'react-native-elements';

const buildings = [
  {key: '1901', status: 'open'},
  {key: '1937', status: 'open'},
  {key: 'A Building', status: 'open'},
  {key: 'B Building', status: 'open'},
  {key: 'C Building', status: 'open'},
  {key: 'D Building', status: 'open'},
  {key: 'E Building', status: 'open'},
  {key: 'Friend Center', status: 'open'},
  {key: 'Frist Campus Center', status: 'open'},
  {key: 'Guyot Hall', status: 'open'},
  {key: 'H Building', status: 'open'},
  {key: 'I Building', status: 'open'},
  {key: 'Jadwin Hall', status: 'open'},
  {key: 'K Building', status: 'open'},
  {key: 'Little Hall', status: 'open'},
  {key: 'McDonnell Hall', status: 'open'},
  {key: 'Neuroscience Institute', status: 'open'},
  {key: 'O Building', status: 'open'},
  {key: 'Physics Lab', status: 'open'},
  {key: 'Q Building', status: 'open'},
  {key: 'R Building', status: 'open'},
  {key: 'S Building', status: 'open'},
  {key: 'T Building', status: 'open'},
  {key: 'U Building', status: 'open'},
  {key: 'V Building', status: 'open'},
];

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Sign Into a Room"
        onPress={() => navigation.navigate('Sign-In')}
      />
      <Button
        title="View All Rooms"
        onPress={() => navigation.navigate('View')}
      />
    </View>
  );
}

class SignInScreen extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    search: '',
    data: buildings,
  }
}

  renderHeader = () => {
    return <SearchBar
        placeholder="Type Here..."
        onChangeText={text => this.searchFilterFunction(text)}
        onClear={text => this.searchFilterFunction('')}
        value={this.state.search}
      />;
  };

  searchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = buildings.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.key ? item.key.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      data: newData,
      search:text,
    });
  }

render() {
  return (
    <View style={styles.container}>
      <FlatList
        data={this.state.data}
        renderItem={({item}) => (<Button title = {item.key} />)}
        ListHeaderComponent={this.renderHeader}
      />
    </View>
  );
}
}

class ViewScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={buildings}
          renderItem={({item}) => (<Text style={styles.text}>{item.key}</Text>)}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
  );
}
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sign-In" component={SignInScreen} />
        <Stack.Screen name="View" component={ViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 42,
  },
  container: {
   flex: 1,
   paddingTop: 0
  },
});


export default App;
