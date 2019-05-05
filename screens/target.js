import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import {createForm} from "rc-form";
import {
  addTargetValue,
  addWeightValue,
  removeZeroDecimal
} from "../helpers/index";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
console.log(width);

class FromItem extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.array
  };
  getError = error => {
    if (error) {
      return (
        <View>
          <Text style={styles.errorTextStyle}>Value entered is invalid</Text>
          <Image
            source={require("./img/WarningIcon.png")}
            style={styles.imageStyle}
          />
        </View>
      );
    }
    return null;
  };
  render() {
    const {onChange, value, error} = this.props;

    return (
      <View>
        <TextInput
          style={[styles.inputStyle, {height: hp("11%")}]}
          value={value || ""}
          placeholder={this.props.weight ? "weight" : "target"}
          duration={150}
          onChangeText={onChange}
        />
        <View>{this.getError(error)}</View>
      </View>
    );
  }
}

class Target extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  };
  static defaultProps = {
    weight: false
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (error) return;
      else {
        const num = removeZeroDecimal(String(value.number));
        this.props.weight ? addWeightValue(num) : addTargetValue(num);
        this.props.weight ? "" : this.props.press();
      }
    });
  };
  render() {
    const {getFieldDecorator, getFieldError} = this.props.form;
    return (
      <View style={this.props.weight ? "" : styles.container}>
        {getFieldDecorator("number", {
          validateFirst: true,
          rules: [
            {required: true, message: "Please enter!"},
            {
              pattern: /^[+]?([0-9]+(?:[\.][0-9]{0,1})?|\.[0-9]{1,2})$/,
              message: "Please enter the correct weight"
            }
          ]
        })(
          <FromItem
            autoFocus
            placeholder="
            target"
            error={getFieldError("number")}
          />
        )}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.submit()}
        >
          <Text style={styles.buttonTextStyle}> CONFIRM </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default createForm()(Target);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputStyle: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#00B0FF",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 20,
    width: wp("94%")
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
  imageStyle: {
    position: "absolute",
    left: wp("88.71%"),
    top: hp("0.01%")
  }
});
