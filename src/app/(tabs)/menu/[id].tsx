import React from 'react';
import { Text, View, Image, FlatList, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@assets/data/products';
import { DefaultPizzaImage } from '@/constants/DefaultPizzaImage';
import { useState } from 'react';
import SizeList from '@/components/SizeList';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize, Product } from '@/types/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];
const upPrice = [1, 1.2, 1.5, 1.8];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const pizza: any = products.find((p) => p.id.toString() === id);
  const { addItem } = useCart();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>(sizes[0]);

  const currentPrice: number = pizza?.price && pizza.price * upPrice[sizes.indexOf(selectedSize)];
  const addToCard = () => {
    if (!pizza) {
      return;
    }
    addItem(pizza, selectedSize, currentPrice);
    router.push('/');
  };

  if (!pizza) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Сорян 404', headerBackTitle: 'Пиццы' }} />
        <Text style={styles.notFound}>Чет я такой пиццы не нашел, братик</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: pizza?.name || 'Сорян 404', headerBackTitle: 'Пиццы' }} />
      <Image
        source={{ uri: pizza.image || DefaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <SizeList sizeArray={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
      <Text style={styles.price}>Цена: {currentPrice.toFixed(2)} BYN</Text>
      <Button text="Добавить в корзину" onPress={addToCard} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    paddingBottom: 5,
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  notFound: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
