require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.calc.calculator.js");
require("./../lib/swisscalc.display.numericDisplay.js");
require("./../lib/swisscalc.display.memoryDisplay.js");

import React from "react";
import { View, Text, StyleSheet, Dimensions, PanResponder } from "react-native";
import { CalcButton, CalcDisplay } from "./../components";

export default class CalculatorScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      orientation: "portait",
    };

    this.oc = global.swisscalc.lib.operatorCache;
    this.calc = new global.swisscalc.calc.calculator();

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) >= 50) {
          this.onBackspacePress();
        }
      },
    });
  }
  onDigitPress = (digit) => {
    this.calc.addDigit(digit);
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onBinaryOperatorPress = (operator) => {
    this.calc.addBinaryOperator(operator);

    this.setState({ display: this.calc.getMainDisplay() });
  };

  onEqualsPress = () => {
    this.calc.equalsPressed();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onBackspacePress = () => {
    this.calc.backspace();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onClearPress = () => {
    this.calc.clear();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onTabPressed = () => {
    this.calc.tabPressed();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onLisoPressed = () => {
    this.calc.lisoPressed();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  renderPortrait() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={styles.displayContainer}
          {...this.panResponder.panHandlers}
        >
          <CalcDisplay display={this.state.display} />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <CalcButton
              onPress={this.onClearPress}
              title="C"
              color="#fff"
              backgroundColor="#dcc894"
            />
            <CalcButton
              onPress={() => {
                this.onBinaryOperatorPress(this.oc.tabOperator);
              }}
              title="Tab"
              color="#fff"
              backgroundColor="#dcc894"
            />
            <CalcButton
              onPress={() => {
                this.onBinaryOperatorPress(this.oc.lisoOperator);
              }}
              title="Liso"
              color="#fff"
              backgroundColor="#dcc894"
            />
            <CalcButton
              onPress={() => {
                this.onBinaryOperatorPress(this.oc.DivisionOperator);
              }}
              title="/"
              color="#fff"
              backgroundColor="#DCA394"
            />
          </View>

          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("7");
              }}
              title="7"
              color="#fff"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("8");
              }}
              title="8"
              color="#fff"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("9");
              }}
              title="9"
              color="#fff"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={() => {
                this.onBinaryOperatorPress(this.oc.MultiplicationOperator);
              }}
              title="x"
              color="#fff"
              backgroundColor="#DCA394"
            />
          </View>

          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("4");
              }}
              title="4"
              color="#fff"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("5");
              }}
              title="5"
              color="#fff"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("6");
              }}
              title="6"
              color="#fff"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={() => {
                this.onBinaryOperatorPress(this.oc.SubtractionOperator);
              }}
              title="-"
              color="#fff"
              backgroundColor="#DCA394"
            />
          </View>

          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("1");
              }}
              title="1"
              color="#fff"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("2");
              }}
              title="2"
              color="#fff"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress("3");
              }}
              title="3"
              color="#fff"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={() => {
                this.onBinaryOperatorPress(this.oc.AdditionOperator);
              }}
              title="+"
              color="#fff"
              backgroundColor="#DCA394"
            />
          </View>

          <View style={styles.buttonRow}>
            <CalcButton
              onPress={() => {
                this.onDigitPress("0");
              }}
              title="0"
              color="#fff"
              backgroundColor="#607D8B"
              style={{ flex: 2 }}
            />
            <CalcButton
              onPress={() => {
                this.onDigitPress(".");
              }}
              title="."
              color="white"
              backgroundColor="#607D8B"
            />
            <CalcButton
              onPress={this.onEqualsPress}
              title="="
              color="#fff"
              backgroundColor="#DCA394"
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderPortrait()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
