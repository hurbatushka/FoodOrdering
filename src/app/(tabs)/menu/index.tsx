import { StyleSheet } from 'react-native';
import { View, FlatList } from 'react-native';
import products from '@assets/data/products';
import { ProductListItem } from '@/components/ProductListItem';
import { StatusBar } from 'expo-status-bar';

export default function MenuScreen() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem pizza={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 5, padding: 5 }}
        columnWrapperStyle={{ gap: 5 }}
      />
      <StatusBar style="dark" />
    </View>
  );
}
