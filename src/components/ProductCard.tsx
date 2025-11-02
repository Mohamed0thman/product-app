import React, { memo } from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  FlexAlignType,
  StyleSheet,
} from 'react-native';
import type { Product } from '../types';
import FastImage from '@d11/react-native-fast-image';

interface ItemCardProps {
  item: Product;
  index: number;
  selected: boolean;
  orientation: 'portrait' | 'landscape';
  cardWidth: number;
  onToggleSelect: (id: string) => void;
}

export const ProductCard = memo(
  ({
    item,
    index,
    selected,
    orientation,
    cardWidth,
    onToggleSelect,
  }: ItemCardProps) => {
    let alignSelf: FlexAlignType = 'center';
    if (orientation === 'landscape') {
      alignSelf = index % 2 === 0 ? 'flex-start' : 'flex-end';
    }

    return (
      <TouchableOpacity
        onPress={() => onToggleSelect(item.id.toString())}
        style={[
          styles.card,
          {
            borderColor: selected ? 'dodgerblue' : '#ccc',
            width: cardWidth,
            alignSelf,
          } as ViewStyle,
        ]}
      >
        <FastImage
          source={{ uri: item.image }}
          style={[
            styles.image,
            { height: orientation === 'portrait' ? 200 : 100 },
          ]}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>{item.price}</Text>
        <Text>{item.tags.join(', ')}</Text>
        <Text>{selected ? '✅ Selected' : '⬜ Tap to select'}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  image: { width: '100%', height: 200, borderRadius: 8 },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});
