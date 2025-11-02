/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { LegendList } from '@legendapp/list';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useCallback } from 'react';
import FastImage from '@d11/react-native-fast-image';
import { useOrientation } from './src/hooks';
import { useItemsManager } from './src/hooks/useItemsManager';
import { DebouncedInput } from './src/components';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={isDarkMode ? 'black' : 'white'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const orientation = useOrientation();

  const {
    items,
    sort,
    selectedIds,
    setQuery,
    setSort,
    toggleSelect,
    deleteSelected,
    reset,
  } = useItemsManager();

  const handleSort = () => {
    if (sort === 'none') setSort('asc');
    else if (sort === 'asc') setSort('desc');
    else reset();
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      const selected = selectedIds.has(item.id.toString());

      return (
        <TouchableOpacity
          onPress={() => toggleSelect(item.id.toString())}
          style={[
            styles.card,
            { borderColor: selected ? 'dodgerblue' : '#ccc', borderWidth: 2 },
          ]}
        >
          <FastImage source={{ uri: item.image }} style={styles.image} />
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{item.price}</Text>
          <Text>{item.tags.join(', ')}</Text>
          <Text>{selected ? '✅ Selected' : '⬜ Tap to select'}</Text>
        </TouchableOpacity>
      );
    },
    [selectedIds, toggleSelect],
  );

  const handleDebouncedChange = useCallback(
    (value: string) => {
      console.log('Debounced Value:', value);
      setQuery(value);
    },
    [setQuery],
  );

  return (
    <View style={[styles.container, { top: safeAreaInsets.top }]}>
      <DebouncedInput onDebouncedChange={handleDebouncedChange} delay={2000} />

      <View style={styles.controls}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button title={`Sort: ASC`} onPress={handleSort} />
          <Button title={`Sort: DSC}`} onPress={handleSort} />
          <Button title={`reset`} onPress={handleSort} />
        </View>

        {selectedIds.size > 0 && (
          <Button
            title={`Delete Selected (${selectedIds.size})`}
            color="red"
            onPress={deleteSelected}
          />
        )}
      </View>

      <LegendList
        key={orientation === 'portrait' ? 1 : 2}
        numColumns={orientation === 'portrait' ? 1 : 2}
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        extraData={selectedIds}
        recycleItems
        contentContainerStyle={{
          paddingBottom: safeAreaInsets.bottom,
          gap: 20,
        }}
        estimatedItemSize={orientation === 'portrait' ? 350 : 300}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, gap: 20 },
  image: { width: '100%', height: 200, borderRadius: 8 },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  controls: {
    marginBottom: 10,
    gap: 10,
  },
});

export default App;
