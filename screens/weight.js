import React, {Component} from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import {addWeightValue} from "../helpers/index";
import moment from "moment";
import Target from "./target";
const width = Dimensions.get("window").width;

class Weight extends Component {
  state = {
    text: "",
    Weights: null
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

  addWeight = () => {
    addWeightValue(this.state.text);
  };
  render() {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {width: 110, height: 39, marginTop: 25, marginBottom: 15}
          ]}
          onPress={() => this.props.press(1)}
        >
          <Text style={styles.buttonTextStyle}> BACK </Text>
        </TouchableOpacity>

        <Target weight={true} style={{marginTop: 10}} />

        <View style={styles.frameStyle}>
          <ScrollView>
            {this.state.Weights !== null ? (
              this.state.Weights.reverse().map((obj, index) => {
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
              })
            ) : (
              <View>
                <ActivityIndicator size="large" color="#00B0FF" />
              </View>
            )}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.buttonStyle, {marginTop: 25}]}
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
    width: 340,
    alignItems: "center",
    justifyContent: "center",
    height: 64,
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
  imageStyle: {
    position: "absolute",
    left: "96.71%",
    top: "26%"
  },

  frameStyle: {
    height: 250,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },

  historyStyle: {
    width: width - 20,
    height: 28,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  linkOneStyle: {
    width: 167,
    height: 20,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(0, 0, 0, 0.5)"
  },
  linkTwoStyle: {
    width: 81,
    height: 20,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(0, 0, 0, 0.5)"
  }
});

export default Weight;
