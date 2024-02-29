import { View, Text, Platform } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';

export default function CartScreen() {
  const { items } = useCart();
  return (
    <View>
      {items.map((item, index) => (
        <View key={index}>
          <Text>{item.product.name}</Text>
          <Text>{item.product.price}</Text>
        </View>
      ))}

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
