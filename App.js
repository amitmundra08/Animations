import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, SafeAreaView, FlatList } from 'react-native';
const width = Dimensions.get('window').width;

//  const backGroundColor = 'rgba(43, 27, 60, 1)'
const backGroundColor = 'black'

const appTexts = {
  mainTitle: 'Title',
  subTitle: 'Tap. Get. Enjoy',
  skip: "Skip"
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  categoriesScreen = () => {
    const { index } = this.state;
    const categories = ["All", "Chocolates & Candy", "Biscuits & Cakes", "Chips & Popcorn", "Namkeen & Sweets"];
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1.5, elevation: 1, zIndex: 9999, backgroundColor: 'red', flexDirection: 'row' }}>
              <Animated.View style={{ height: 96, borderRadius: 32, width: 4, backgroundColor: 'green', marginTop: 8, top: this.leftBar.interpolate({ inputRange: [0, index], outputRange: [0, index * (124)] }) }} />
              <View style={{ marginLeft: 16 }}>
                <FlatList
                  renderItem={this.renderItem}
                  data={categories}
                  extraData={this.state}
                  keyExtractor={this.keyExtractor}
                />
              </View>
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Hiiii</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  signUpPage = () => {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.animatedContainer, {
            borderBottomRightRadius: this.fade.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width],
            })
          }]}>
          <Animated.Image
            source={require("./bgImage.jpeg")}
            style={[styles.imageStyle, {
              borderBottomRightRadius: this.fade.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width],
              })
            }]}
          />
          <View style={styles.skipTextContainer}>
            <TouchableOpacity>
              <Animated.Text style={[styles.skipText, {
                color: this.fade.interpolate({
                  inputRange: [0, 1],
                  outputRange: [backGroundColor, 'red'],
                })
              }
              ]}>
                {appTexts.skip} &gt;
              </Animated.Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.titleContainer}
          >
            <Text
              style={styles.titleText}>
              {appTexts.mainTitle}
            </Text>
            <Animated.View>
              <Animated.Text
                style={[{
                  color: this.fade.interpolate({
                    inputRange: [0, 1],
                    outputRange: [backGroundColor, 'white'],
                  })
                }, styles.subTitle]}>
                {appTexts.subTitle}
              </Animated.Text>
            </Animated.View>
          </View>
        </Animated.View>
        <Animated.View style={{ flex: this.fadeIn() }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 32 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Continue with</Text>
          </View>
          <View>
            <TextInput

            />
          </View>
        </Animated.View>
      </View>
    );
  }

  componentDidMount() {
    this.animateObject()
  }

  fade = new Animated.Value(0);
  leftBar = new Animated.Value(0);
  top = new Animated.Value(0);

  fadeIn = () => {
    Animated.timing(this.fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    return this.fade;
  };

  animateObject = () => {
    Animated.timing(this.top, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
    return this.top;
  }

  animateLeftBar = (index) => {
    Animated.timing(this.leftBar, {
      toValue: index,
      duration: 1000,
      useNativeDriver: false
    }).start();
    this.setState({ index: index })
    return this.leftBar
  }

  renderItem = (itemValue) => {
    const { item, index } = itemValue;
    return (
      <View
        style={{ maxHeight: 106, marginTop: 16 }}>
        <TouchableOpacity
          onPress={() => {
            this.animateObject(), this.animateLeftBar(index)
          }}
          style={{ height: 64, width: 64, borderRadius: 32, backgroundColor: 'yellow', justifyContent: 'flex-end', alignItems: 'center', marginTop: 8 }}
        >
          <Animated.Image
            style={[styles.iconImageStyle, {
              top: this.top.interpolate({
                inputRange: [0, 1],
                outputRange: [0, index === this.state.index ? -28 : 0],
              }),
              borderBottomRightRadius: index === this.state.index ? 0 : 6,
              borderBottomLeftRadius: index === this.state.index ? 0 : 6,
            }]}
            source={require("./bgImage.jpeg")}
          >
          </Animated.Image>
        </TouchableOpacity>
        <View style={{ marginRight: 24, marginTop: 2 }}>
          <Text numberOfLines={2} style={{ textAlign: 'center' }}>{item}</Text>
        </View>
      </View>
    )

  }

  keyExtractor = (item, index) => index.toString()

  render() {
    return (
      this.signUpPage()
    )

    // signup page

  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  animatedContainer: {
    width: width * 4,
    height: width,
    flex: 1,
    backgroundColor: backGroundColor,
    marginLeft: -width * 2.989,
    marginTop: -100,
  },
  titleContainer: {
    bottom: width / 3,
    right: width / 3,
    position: 'absolute',
  },
  titleText: {
    color: 'red',
    fontSize: 48,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  skipTextContainer: {
    top: width / 2,
    right: width / 11,
    position: 'absolute',
  },
  skipText: { color: 'red', fontSize: 16, fontWeight: 'bold' },
  imageStyle: {
    height: '100%',
    width: '100%',
    flex: 1,
    marginLeft: width / 5,
  },
  iconImageStyle: {
    height: 36,
    width: 32
  }
})

export default App;