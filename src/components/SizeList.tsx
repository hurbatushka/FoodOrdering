import Colors from '@/constants/Colors';
import { PizzaSize } from '@/types/types';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

type SizeListProps = {
  sizeArray: PizzaSize[];
  selectedSize: PizzaSize;
  setSelectedSize: React.Dispatch<React.SetStateAction<PizzaSize>>;
};

export default function SizeList({ sizeArray, selectedSize, setSelectedSize }: SizeListProps) {
  return (
    <View style={styles.sizes}>
      {sizeArray.map((item, index) => (
        <Pressable key={index} onPress={() => setSelectedSize(sizeArray[index])}>
          <View style={selectedSize === sizeArray[index] ? styles.selectedSizeText : styles.size}>
            <Text style={styles.sizeText}>{item}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  size: {
    height: 60,
    width: 60,
    padding: 20,
    margin: 10,
    aspectRatio: 1,
    alignItems: 'center',
    borderRadius: 30,
  },
  sizeText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedSizeText: {
    height: 60,
    width: 60,
    backgroundColor: Colors.light.tint,
    padding: 20,
    margin: 10,
    aspectRatio: 1,
    alignItems: 'center',
    borderRadius: 30,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
