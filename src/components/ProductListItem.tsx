import { Image, Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { DefaultPizzaImage } from '@/constants/DefaultPizzaImage';
import { ProductListItemsProps } from '@/types/Props/ProductListItemsProps';
import { Link } from 'expo-router';

export const ProductListItem = ({ pizza }: ProductListItemsProps) => {
  return (
    <Link href={`/menu/${pizza.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: pizza.image || DefaultPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{pizza.name}</Text>
        <Text style={styles.price}>{pizza.price} BYN</Text>
      </Pressable>
    </Link>
  );
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    marginBottom: 10,
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 10,
    marginLeft: 5,
  },
  price: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.tint,
    textDecorationStyle: 'solid',
    marginLeft: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
