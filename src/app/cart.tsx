import { View, Text, Platform, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import Button from '@/components/Button';
import CartListItem from '@/components/CartListItem';
import Colors from '@/constants/Colors';

export default function CartScreen() {
  const { items, removeAllitems } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        ListFooterComponent={
          items.length > 0 ? (
            <Button text="Очистить корзину" onPress={() => removeAllitems()} />
          ) : (
            <View style={styles.container}>
              <Text style={styles.title}>Корзина пуста</Text>
            </View>
          )
        }
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 100,
  },
});
