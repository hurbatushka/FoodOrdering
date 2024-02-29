import { View, Text, Platform } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

export default function cart() {
  return (
    <View>
      <Text>cart</Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
