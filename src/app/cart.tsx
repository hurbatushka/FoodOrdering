import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import Button from '@/components/Button';
import CartListItem from '@/components/CartListItem';
import Colors from '@/constants/Colors';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function CartScreen() {
  const { items, removeAllitems, removeItem, total } = useCart();
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Корзина',
          headerRight: () =>
            items.length > 0 && (
              <Pressable
                onPress={removeAllitems}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome name="trash-o" size={25} color={Colors.light.text} />
              </Pressable>
            ),
        }}
      />
      <SwipeListView
        data={items}
        renderItem={({ item }, rowMap) => <CartListItem cartItem={item} />}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => removeItem(data.item)}>
              <Text style={styles.backTextWhite}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
        disableRightSwipe
        rightOpenValue={-90}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        ListFooterComponent={
          items.length > 0 ? (
            <>
              <Text style={{ marginLeft: 10, marginTop: 20, fontSize: 17, fontWeight: 'bold' }}>
                Итого: {total.toFixed(2)} BYN
              </Text>
              <Button text="Оформить заказ" />
            </>
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
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowBack: {
    borderRadius: 11,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  backRightBtn: {
    borderRadius: 11,
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontWeight: '500',
//     fontSize: 18,
//     marginBottom: 100,
//   },
// });
