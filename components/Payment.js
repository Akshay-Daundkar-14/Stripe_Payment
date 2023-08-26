import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";

const Payment = () => {
  // ------- All States ---------

  const [cur, setCur] = useState("AED");
  const [amt, setAmt] = useState("");

  // ------- Stripe related things ------
  const stripe = useStripe();

  // --------- functions --------

  const subscribe = async () => {
    if (!cur) return Alert.alert("Please Enter Currency");
    if (!amt) return Alert.alert("Please Enter Amount");

    //console.log("Subscribe Get called -- 1");

    const bodyData = {
      amount: parseInt(amt) * 100,
      currency: cur,
    };

    console.log("Body Data ", bodyData);

    try {
      // ----- Send Request -------

      const response = await fetch(
        "http://113.193.63.106:6004/api/Payment/create-payment-intent",
        {
          method: "POST",
          body: JSON.stringify(bodyData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //console.log("Response  ", response);

      const data = await response.json();

      //console.log("Response JSON  ", data);

      if (!response.ok)
        return Alert.alert("Response missed .. client secret not created");

      const clientSecret = data.clientSecret;
      //console.log("Client Secret ==> ", clientSecret);

      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName:"Akshay Daundkar"
      });

      if (initSheet.error)
        return Alert.alert("Init Sheet Error ", initSheet.error.message);

      const presentSheet = await stripe.presentPaymentSheet({ clientSecret });

      if (presentSheet.error)
        return Alert.alert("present Sheet Error ", presentSheet.error.message);

      Alert.alert("Payment successfully done. Thank You !!");
    } catch (error) {
      //console.log("Catch Error ", error);
      Alert.alert("Something went wrong ! please try again later");
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 50, fontWeight: "600", marginBottom: 45 }}>
        Payment
      </Text>
      <TextInput
        value={cur}
        onChangeText={setCur}
        placeholder="Enter your currency"
        style={{
          width: 300,
          padding: 10,
          fontSize: 20,
          margin: 1,
        }}
      />

      <TextInput
        value={amt}
        keyboardType="numeric"
        onChangeText={setAmt}
        placeholder="Enter your amount"
        style={{
          width: 300,
          padding: 10,
          fontSize: 20,
          margin: 1,
        }}
      />
      <Button title="Subscribe - 20 INR" onPress={subscribe} />
    </View>
  );
};

export default Payment;
