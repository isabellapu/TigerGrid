import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Button, View, Text, ScrollView, FlatList, Alert } from 'react-native';
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

let studying = false;
let signedin = [];

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Sign Into a Room"
        onPress={() => navigation.navigate('Sign-In')}
      />
      <Button
        title="Sign Out of a Room"
        onPress={() => navigation.navigate('Sign-Out')}
      />
      <Button
        title="View All Rooms"
        onPress={() => navigation.navigate('View Rooms')}
      />
    </View>
  );
}

class SignInScreen extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    search: '',
    data: buildings.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.status;
      return(itemData === 'open');
    }),
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
      const openData = item.status;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1 && openData === 'open';
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      data: newData,
      search:text,
    });
  }

  onPressSignIn(name) {
    Alert.alert(
      name,
      "Do you want to sign-in to " + name + "?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sign-In", onPress: () => this.changeStatus(name)}
      ],
      { cancelable: false }
    );
  }

  changeStatus(name) {
    buildings.find(x => x.key === name).status = 'taken';
    studying = true;
    signedin.push(buildings.find(x => x.key === name));
    this.searchFilterFunction(this.state.search);
  }

render() {
  return (
    <View style={styles.container}>
      <FlatList
        data={this.state.data}
        renderItem={({item}) => (<Button
          title = {item.key}
          onPress={() => this.onPressSignIn(item.key)} />)
        }
        ListHeaderComponent={this.renderHeader}
      />
    </View>
  );
}
}

class SignOutScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: signedin,
    }
  }

  render() {
    if (!studying) {
    return (
      <View style={styles.container}>
      <Text style={styles.text}>You are not signed into any buildings.</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
      <Text style={styles.text}>Sign out of: </Text>
      <FlatList
        data={this.state.data}
        renderItem={({item}) => (<Button
          title = {item.key}
           />)
        }
      />
      </View>
    );
  }
  }
}

class ViewScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: buildings,
      // closedData: buildings.filter(function(item) {
      //   //applying filter for the inserted text in search bar
      //   const itemData = item.status;
      //   return(itemData === 'taken');
      // }),
    }
  }

  renderHeader = () => {
    return [
      <SearchBar
        placeholder="Type Here..."
        onChangeText={text => this.searchFilterFunction(text)}
        onClear={text => this.searchFilterFunction('')}
        value={this.state.search}
      />,
      <View style={{ flexDirection: "row" ,justifyContent: 'space-evenly' }}>
       <View style={styles.buttonContainer}>
        <Button title="Show Open"
        onPress={this.showOpen}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Show Taken"
        onPress={this.showTaken}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Show All"
        onPress={this.showAll}/>
      </View>
    </View>
  ]
  };

  showOpen = () => {
    const newData = buildings.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.status;
      return(itemData === 'open');
    });
    this.setState({
      data: newData,
    });
  }

  showTaken = () => {
    const newData = buildings.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.status;
      return(itemData === 'taken');
    });
    this.setState({
      data: newData,
    });
  }

  showAll = () => {
    this.setState({
      data: buildings,
    });
  }

  searchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = buildings.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.key ? item.key.toUpperCase() : ''.toUpperCase();
      const openData = item.status;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1 && openData === 'open';
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
          renderItem={({item}) => (<Text style={styles.text}>{item.key}, {item.status}</Text>)}
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
        <Stack.Screen name="Sign-Out" component={SignOutScreen} />
        <Stack.Screen name="View Rooms" component={ViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '31%',
    height: 40,
    backgroundColor: 'pink',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    color: 'green'
  },
  takenText: {
    fontSize: 24,
    color: 'black'
  },
  container: {
   flex: 1,
   paddingTop: 0
  },
});


export default App;
