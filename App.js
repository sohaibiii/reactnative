import React from "react";
import {View} from "react-native";
import Weight from "./screens/weight";
import Apps from "./screens/target";
import Chart from "./screens/chart";

export default class App extends React.Component {
  state = {
    screen: 3
  };
  renderComponents = () => {
    switch (this.state.screen) {
      case 1:
        return (
          <Apps
            press={() => {
              this.setState({screen: 2});
            }}
          />
        );
      case 2:
        return (
          <Weight
            press={num => {
              this.setState({screen: num});
            }}
          />
        );
      case 3:
        return (
          <Chart
            press={() => {
              this.setState({screen: 2});
            }}
          />
        );
      default:
        return <Target />;
    }
  };
  render() {
    return <View style={{flex: 1}}>{this.renderComponents()}</View>;
  }
}
