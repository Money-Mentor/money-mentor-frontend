import React from "react";
import { PickerIOS, Animated, TouchableHighlight, View, Text, StyleSheet } from "react-native";

class Picker extends React.Component {
  constructor() {
    super();
    // this.closeModal = this.closeModal(this);
  }
  componentDidMount() {
    Animated.timing(this.props.offSet, {
      duration: 300,
      toValue: 100
    }).start();
  }

  // closeModal() {
  //   Animated.timing(this.props.offSet, {
  //     duration: 300,
  //     toValue: deviceHeight
  //   }).start(this.props.closeModal);
  // }

  render() {
    const PickerItemIOS = PickerIOS.Item;

    const categories = [
      { category: "Food and Drink", actual: 'foodAndDrink' },
      { category: "Travel", actual: 'travel'   },
      { category: "Reacreation", actual: 'reacreation'  },
      { category: "Healthcare", actual: 'healthcare'  },
      { category: "Service", actual: 'service'  },
      { category: "Community", actual: 'community'  },
      { category: "Shops", actual: 'shops'  }
    ];

    return (
      // <Animated.View style={{ transform: [{ translateY: this.props.offSet }] }}>
      //   <View style={styles.closeButtonContainer}>
      //     <TouchableHighlight
      //       onPress={this.closeModal}
      //       underlayColor="transparent"
      //       style={styles.closeButton}
      //     >
      //       <Text style={styles.closeButtonText}>Choose</Text>
      //     </TouchableHighlight>
      //   </View>
      //   <PickerIOS
      //     selectedValue={this.props.category}
      //     onValueChange={category => this.props.handleCategoryChange(category)}
      //   >
      //     {categories.map(category => (
      //       <PickerItemIOS
      //         label={category.category}
      //       />
      //     ))}
      //   </PickerIOS>
      // </Animated.View>
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  showtimeContainer: {
    borderTopColor: "#ededed",
    borderTopWidth: 1
  },
  showtime: {
    padding: 20,
    textAlign: "center"
  },
  button: {
    marginTop: 25,
    marginBottom: 25
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopColor: "#e2e2e2",
    borderTopWidth: 1,
    borderBottomColor: "#e2e2e2",
    borderBottomWidth: 1
  },
  closeButton: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonText: {
    textAlign: "center"
  },
  closeButtonText: {
    color: "#027afe"
  }
});
export default Picker;
