import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../../common/styles";

const Initial = props => {

  return (
    <View style={styles.container}>
      <View style={styles.logoLocation}>
      <View style={{position: 'relative', top: 20}}>
        <Image source={require("../../../public/img/logo.png")} />
        </View>

        <Text style={styles.initialScreenText}>money mentor</Text>
      </View>
      <View style={{ padding: 40 }}>
        <View style={{ padding: 10 }}>
          <Button
            raised
            buttonStyle={styles.button}
            textStyle={{ textAlign: "center" }}
            title={`Login`}
            onPress={() =>
              props.navigation.navigate("Login", { title: "Login" })
            }
          >
            Login
          </Button>
        </View>
        <View style={{ padding: 10 }}>
          <Button
            raised
            buttonStyle={styles.button}
            textStyle={{ textAlign: "center" }}
            title={`Signup`}
            onPress={() =>
              props.navigation.navigate("Signup", { title: "Signup" })
            }
          >
            Signup
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Initial;
