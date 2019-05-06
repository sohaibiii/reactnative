import React, {Component} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Image,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import _ from "lodash";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {Slider} from "react-native-elements";

export default class Chart extends Component {
  state = {
    value: null,
    language: null,
    Weights: false
  };

  componentDidMount() {
    this.renderWeights();
  }

  renderWeights = async () => {
    try {
      const res = await AsyncStorage.getItem("weights");
      const response = JSON.parse(res);

      this.setState({
        Weights: [...response]
      });
    } catch (error) {
      if (error) {
        this.setState({Weights: null});
      }
    }
  };

  dropDownOne = () => {
    return (
      <View style={[styles.dropDownStyle, {marginBottom: 10, marginTop: 10}]}>
        <Picker
          selectedValue={this.state.language}
          style={styles.dropDownPickerStyle}
          onValueChange={(itemValue, itemIndex) => alert("clicked")}
          mode="dropdown"
        >
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Weekly" value="Weekly" />
          <Picker.Item label="Monthly" value="Monthly" />
        </Picker>
        <Image
          source={require("./img/DropdownArrow.png")}
          style={styles.arrowIconStyle}
        />
      </View>
    );
  };
  dropDownTwo = () => {
    return (
      <View style={styles.dropDownStyle}>
        <Picker
          selectedValue={this.state.language}
          style={styles.dropDownPickerStyle}
          onValueChange={(itemValue, itemIndex) => alert("clicked")}
          mode="dropdown"
        >
          <Picker.Item label="10" value="10" />
          <Picker.Item label="20" value="20" />
          <Picker.Item label="30" value="30" />
          <Picker.Item label="40" value="40" />
          <Picker.Item label="50" value="50" />
        </Picker>
        <Image
          source={require("./img/DropdownArrow.png")}
          style={styles.arrowIconStyle}
        />
      </View>
    );
  };

  graphLogic = () => {
    // finding weight records
    const {Weights} = this.state;

    // separating each day from another day
    const arrays = Weights.map(d =>
      Weights.filter(
        e => String(e.date).substr(0, 10) == String(d.date).substr(0, 10)
      )
    );
    //remove duplicate arrays
    const uniqueArrays = _.uniqBy(arrays, arr => {
      return String(arr[0].date).substr(0, 10);
    });
    // sorted the each day objects by value
    const orderedArrays = uniqueArrays.map(singleArray => {
      const sortedObjects = _.orderBy(singleArray, ["value"], ["asc"]);
      return sortedObjects;
    });
    // showing the each day graph
    return orderedArrays.map((a, index) => {
      const day = String(a[0].date).substr(0, 10);
      const min = a[0].value;
      // if single day has only one value then enter the max value 89
      const max = a[a.length - 1].value || 89;

      return this.graphBar(min, max, day, index);
    });
  };

  graphBar = (min, max, day, index) => {
    // putting graph logic here
    const chartMin = 87.6;
    const chartMax = 89;
    const divider = 1.4;
    console.log("min and max values are", min, max);

    const leftMargin = (Math.abs(min - chartMin) / divider) * 100;

    const graphWidth = (Math.abs(max - min) / divider) * 100;

    return (
      <View style={styles.barStyle} key={index}>
        <View style={{marginRight: 6}}>
          <Text
            style={[
              styles.buttonTextStyle,
              {fontSize: 14, color: "rgba(0, 0, 0, 0.5)"}
            ]}
          >
            {day}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#00B0FF",
            marginLeft: `${leftMargin}%`,
            width: `${graphWidth}%`
          }}
        />
      </View>
    );
  };

  render() {
    if (this.state.Weights === false) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00B0FF" />
        </View>
      );
    } else if (this.state.Weights === null) {
      return (
        <View style={[styles.container, {alignItems: "center"}]}>
          <Text>you don't have any history</Text>
          <TouchableWithoutFeedback
            style={{
              height: hp("5%"),
              width: wp("15%"),
              borderColor: "gray",
              borderWidth: 1
            }}
            onPress={() => this.props.press()}
          >
            <Text>back</Text>
          </TouchableWithoutFeedback>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, margin: 10}}>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {width: wp("30.5%"), height: hp("6.5%"), marginTop: 30}
            ]}
            onPress={() => this.props.press()}
          >
            <Text style={styles.buttonTextStyle}> BACK </Text>
          </TouchableOpacity>
          <View style={[styles.rangeLabelStyle]}>
            <Text>87.6</Text>
            <Text>89.0</Text>
          </View>
          <View style={styles.frameStyle}>
            <ScrollView>{this.graphLogic()}</ScrollView>
          </View>
          <View style={styles.rangeLabelStyle}>
            <Text>87.6</Text>
            <Text>89.0</Text>
          </View>
          <Slider
            style={{marginBottom: 25}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#00B0FF"
            maximumTrackTintColor="rgba(0, 0, 0, 0.26)"
            value={this.state.value}
            onValueChange={value => this.setState({value})}
            onSlidingComplete={() => alert("slider clicked")}
            thumbTintColor="#00B0FF"
          />
          <View
            style={{
              marginBottom: 32,
              marginTop: "auto"
            }}
          >
            <Text style={{textAlign: "center"}}>Range</Text>
            <View style={{flexDirection: "row"}}>
              <Text>2019-04-24</Text>
              <Text style={{marginLeft: 10}}>88.2</Text>
              <Text style={{marginLeft: 42}}>2019-04-28</Text>
              <Text style={{marginLeft: 10}}>87.0</Text>
              <Text style={{marginLeft: "auto"}}>-1.2</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={{marginLeft: 70}}>Min</Text>
              <Text style={{marginLeft: 150}}>Max</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={{marginLeft: 30}}>88.2</Text>
              <Text style={{marginLeft: 30}}>87.0</Text>
              <Text style={{marginLeft: 30}}>-1.2</Text>
              <Text style={{marginLeft: 30}}>88.2</Text>
              <Text style={{marginLeft: 30}}>87.0</Text>
              <Text style={{marginLeft: "auto"}}>-1.2</Text>
            </View>
          </View>
          <View style={{marginTop: "auto"}}>
            {this.dropDownOne()}
            {this.dropDownTwo()}
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  buttonStyle: {
    backgroundColor: "#00B0FF",
    borderRadius: 5,
    width: wp("94%"),
    alignItems: "center",
    justifyContent: "center",
    height: hp("11%"),
    marginTop: 2
  },
  buttonTextStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 18,
    lineHeight: 21,
    color: "#FFFFFF"
  },
  frameStyle: {
    marginLeft: 39,
    marginRight: 39,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    height: hp("36.3%"),
    paddingTop: 5
  },
  barStyle: {
    flexDirection: "row",
    marginBottom: 15,
    height: hp("3.53%")
  },
  dropDownStyle: {
    height: hp("11%"),
    width: wp("94%"),
    borderColor: "#00B0FF",
    borderWidth: 1,
    borderRadius: 5
  },
  dropDownPickerStyle: {
    height: hp("11%"),
    width: wp("78%"),
    marginLeft: 10,
    color: "rgba(0, 0, 0, 0.26)"
  },
  arrowIconStyle: {
    position: "absolute",
    left: wp("73.4%"),
    right: wp("9.53%"),
    top: hp("4.56%"),
    bottom: hp("10.5%")
  },
  rangeLabelStyle: {
    flexDirection: "row",
    width: wp("64%"),
    height: hp("2.55%"),
    marginLeft: "auto",
    justifyContent: "space-between"
  }
});
