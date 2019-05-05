import React, {Component} from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {addWeightValue} from "../helpers/index";
import moment from "moment";
import Target from "./target";

class Weight extends Component {
  state = {
    text: "",
    Weights: false
  };

  componentDidMount() {
    this.renderWeights();
  }
  renderWeights = async () => {
    try {
      const res = await AsyncStorage.getItem("weights");
      const response = JSON.parse(res);
      typeof response === null ? this.setState({Weights: null}) : "";

      this.setState({
        Weights: [...response]
      });
    } catch (error) {
      if (error) {
        this.setState({Weights: null});
      }
    }
  };

  addWeight = () => {
    addWeightValue(this.state.text);
  };

  renderHistory = () => {
    switch (this.state.Weights) {
      case false:
        return (
          <View>
            <ActivityIndicator size="large" color="#00B0FF" />
          </View>
        );
      case null:
        return <Text>you don't have any weights </Text>;
      default:
        return this.state.Weights.reverse().map((obj, index) => {
          return (
            <View
              style={styles.historyStyle}
              key={obj.date + obj.value + index}
            >
              <Text style={styles.linkOneStyle}>
                {moment(`${obj.date}`, "YYYY-MM-DDTHH:mm:ss.SSS").format(
                  " YYYY-MM-DD hh:mm A"
                )}
              </Text>
              <Text style={styles.linkTwoStyle}>{obj.value}</Text>
            </View>
          );
        });
    }
  };
  render() {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              width: wp("30.5%"),
              height: hp("6.5%"),
              marginTop: 25,
              marginBottom: 13
            }
          ]}
          onPress={() => this.props.press(1)}
        >
          <Text style={styles.buttonTextStyle}> BACK </Text>
        </TouchableOpacity>

        <Target
          weight={true}
          style={{marginTop: 10}}
          renderWeights={() => this.renderWeights()}
        />

        <View style={styles.frameStyle}>
          <ScrollView>{this.renderHistory()}</ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.buttonStyle, {marginTop: 15}]}
          onPress={() => this.props.press(3)}
        >
          <Text style={styles.buttonTextStyle}> CHART </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#00B0FF",
    borderStyle: "solid",
    borderRadius: 5,
    marginTop: 15
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

  errorTextStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 16,
    color: "#F44336"
  },

  frameStyle: {
    height: hp("45.64%"),
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },

  historyStyle: {
    width: wp("94.5%"),
    height: hp("4.4%"),
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  linkOneStyle: {
    width: wp("46.4%"),
    height: hp("3.2%"),
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(0, 0, 0, 0.5)"
  },
  linkTwoStyle: {
    width: wp("22.53%"),
    height: hp("3.2%"),
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(0, 0, 0, 0.5)"
  }
});

export default Weight;
