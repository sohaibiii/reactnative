import {AsyncStorage} from "react-native";
import moment from "moment";

const addTargetValue = async value => {
  const res = await AsyncStorage.getItem("targets");

  let arr = JSON.parse(res);

  if (!arr) {
    arr = [];
    arr.push({target: value});
    await AsyncStorage.setItem("targets", JSON.stringify(arr));
  } else {
    const newarr = [...arr, {target: value}];
    await AsyncStorage.setItem("targets", JSON.stringify(newarr));
  }
};

const addWeightValue = async value => {
  const res = await AsyncStorage.getItem("weights");

  let arr = JSON.parse(res);

  if (!arr) {
    arr = [];
    arr.push({date: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"), value: value});
    await AsyncStorage.setItem("weights", JSON.stringify(arr));
  } else {
    const newarr = [
      ...arr,
      {date: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"), value: value}
    ];
    await AsyncStorage.setItem("weights", JSON.stringify(newarr));
  }
};

const removeZeroDecimal = num => {
  return num.split(".")[1] === "0" ? (num = num.split(".")[0]) : num;
};
export {addTargetValue, addWeightValue, removeZeroDecimal};
